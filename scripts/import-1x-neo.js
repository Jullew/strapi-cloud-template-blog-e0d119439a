const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const robotData = require('../robots/1x-neo.json');
const claimsData = require('../robots/1x-neo-claims.json');

const STRAPI_URL = process.env.STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL || !API_TOKEN) {
    console.error('Error: STRAPI_URL and STRAPI_API_TOKEN must be defined in .env');
    process.exit(1);
}

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
};

// Helper: Handle Fetch errors
async function fetchAPI(endpoint, method = 'GET', body = null) {
    const url = `${STRAPI_URL}/api${endpoint}`;
    const logMsg = `${method} ${url}\n`;
    console.log(logMsg.trim());
    fs.appendFileSync('debug.log', logMsg);

    const options = {
        method,
        headers,
    };
    if (body) {
        options.body = JSON.stringify({ data: body });
    }

    const res = await fetch(url, options);

    if (!res.ok) {
        const errorText = await res.text();
        let formattedError = errorText;
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error && errorJson.error.details && errorJson.error.details.errors) {
                formattedError = JSON.stringify(errorJson.error.details.errors, null, 2);
            } else if (errorJson.error) {
                formattedError = JSON.stringify(errorJson.error, null, 2);
            }
        } catch (e) {
            // keep text
        }

        const errorMsg = `API Error ${res.status} ${res.statusText} at ${url}:\n${formattedError}`;
        fs.appendFileSync('debug.log', `ERROR: ${errorMsg}\n`);
        throw new Error(errorMsg);
    }

    const json = await res.json();
    return json.data;
}

const endpointCache = {};

async function determineEndpoint(collection) {
    if (endpointCache[collection]) return endpointCache[collection];

    // Try plural (default provided)
    const urlPlural = `${STRAPI_URL}/api/${collection}`;
    console.log(`Checking endpoint: ${urlPlural}`);
    const res = await fetch(urlPlural, { method: 'GET', headers });
    if (res.ok) {
        endpointCache[collection] = collection;
        return collection;
    }

    // Try singular (naive un-pluralize: remove 's')
    let singular = collection.endsWith('s') ? collection.slice(0, -1) : collection;
    // Handle kebab-case pluralization (target-users -> target-user)

    const urlSingular = `${STRAPI_URL}/api/${singular}`;
    console.log(`Checking endpoint: ${urlSingular}`);
    const resSingular = await fetch(urlSingular, { method: 'GET', headers });
    if (resSingular.ok) {
        console.log(`Found singular endpoint: ${singular}`);
        endpointCache[collection] = singular;
        return singular;
    }

    // Throw if neither
    throw new Error(`Could not find endpoint for collection '${collection}'. Tried '/${collection}' and '/${singular}'`);
}

// Helper: Find first by filter
async function findFirst(collection, filters) {
    const endpoint = await determineEndpoint(collection);

    // Strapi 5 uses `filters[field][$eq]=value`
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
        params.append(`filters[${key}][$eq]`, value);
    }

    // Use the resolved endpoint
    const data = await fetchAPI(`/${endpoint}?${params.toString()}`);
    return data && data.length > 0 ? data[0] : null;
}

async function main() {
    try {
        console.log(`Connecting to Strapi at ${STRAPI_URL}...`);

        // 1. Ensure Manufacturer
        const manufCollection = await determineEndpoint('manufacturers');
        const manufName = robotData.manufacturer.lookup.name;
        let manufacturer = await findFirst('manufacturers', { name: manufName });

        if (!manufacturer) {
            console.log(`Creating manufacturer: ${manufName}`);
            // Use resolved endpoint
            manufacturer = await fetchAPI(`/${manufCollection}`, 'POST', {
                name: manufName,
                slug: manufName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            });
        }
        console.log(`Manufacturer ID: ${manufacturer.documentId || manufacturer.id}`);

        // 2. Ensure Reference Entities
        const ensureRef = async (collection, code) => {
            // resolve endpoint first
            const endpoint = await determineEndpoint(collection);

            let entry = await findFirst(collection, { code });
            if (!entry) {
                console.log(`Creating ${collection}: ${code}`);
                entry = await fetchAPI(`/${endpoint}`, 'POST', {
                    name: code,
                    code: code,
                });
            }
            return entry;
        };

        const regionIds = [];
        if (robotData.regions) {
            for (const code of robotData.regions) {
                const entry = await ensureRef('regions', code);
                if (entry) regionIds.push(entry.id);
            }
        }

        const envTypeIds = [];
        if (robotData.intended_use && robotData.intended_use.environment_type) {
            for (const code of robotData.intended_use.environment_type) {
                const entry = await ensureRef('environment-types', code);
                if (entry) envTypeIds.push(entry.id);
            }
        }

        const targetUserIds = [];
        if (robotData.intended_use && robotData.intended_use.target_user) {
            for (const code of robotData.intended_use.target_user) {
                const entry = await ensureRef('target-users', code);
                if (entry) targetUserIds.push(entry.id);
            }
        }

        // 3. Ensure Sources
        const sourceCollection = await determineEndpoint('sources');
        const sourceSlugs = new Set();
        if (robotData.sources?.connect_by_slug) {
            robotData.sources.connect_by_slug.forEach(s => sourceSlugs.add(s));
        }
        claimsData.claims_to_create.forEach(c => {
            if (c.evidence?.connect_by_slug) {
                c.evidence.connect_by_slug.forEach(s => sourceSlugs.add(s));
            }
        });

        const sourceMap = {};
        for (const slug of sourceSlugs) {
            let source = await findFirst('sources', { title: slug });
            if (!source) {
                console.log(`Creating Source: ${slug}`);
                source = await fetchAPI(`/${sourceCollection}`, 'POST', {
                    title: slug,
                    type: 'official_doc',
                    url: `https://placeholder.com/${slug}`,
                    evidence_quality: 'D_marketing_claim'
                });
            }
            sourceMap[slug] = source.id;
        }

        // 4. Create/Update Robot (Base)
        console.log(`Checking Robot: ${robotData.name}`);
        const robotCollection = await determineEndpoint('robots');
        let robot = await findFirst('robots', { slug: robotData.slug });

        const baseRobotData = {
            name: robotData.name,
            slug: robotData.slug,
            short_neutral_summary: robotData.short_neutral_summary,
            market_status: robotData.market_status,
            availability_status: robotData.availability_status,
            review_status: robotData.review_status,
            blocked_reason: robotData.blocked_reason,
            media_disclaimer: robotData.media_disclaimer,
            manufacturer: manufacturer.id,
            regions: regionIds,
            sources: (robotData.sources?.connect_by_slug || []).map(s => sourceMap[s]),
            classification: robotData.classification,
            specs_public: { ...robotData.specs_public },
            environment_requirements: robotData.environment_requirements,
            safety: robotData.safety,
            autonomy_and_control: robotData.autonomy_and_control,
            expert_summary: robotData.expert_summary,
            notes_internal: robotData.notes_internal || ''
        };

        if (robotData.intended_use) {
            baseRobotData.intended_use = {
                ...robotData.intended_use,
                environment_type: envTypeIds,
                target_user: targetUserIds
            };
        }

        if (!robot) {
            console.log('Creating Robot base...');
            try {
                // Strapi 5 might require 'status' or just publish/draft logic
                robot = await fetchAPI(`/${robotCollection}`, 'POST', baseRobotData);
            } catch (e) {
                console.error("Failed to create robot", e);
                // If it fails on relations, try minimizing payload
                throw e;
            }
        } else {
            console.log('Updating Robot base...');
            await fetchAPI(`/${robotCollection}/${robot.documentId}`, 'PUT', baseRobotData);
            // Note: Strapi 5 uses documentId in URL for updates typically, check valid syntax?
            // Standard /api/robots/:documentId or /api/robots/:id
            // Let's rely on standard documentId if available, else id
        }

        const robotId = robot.id; // For claim relation
        const robotDocumentId = robot.documentId;
        console.log(`Robot Document ID: ${robotDocumentId}`);

        // 5. Create/Update Claims
        console.log('Processing Claims...');
        const claimCollection = await determineEndpoint('claims');
        const claimMap = {};  // slug -> id

        for (const c of claimsData.claims_to_create) {
            // Find existing claim by title AND robot relation?
            // Filter by relation is complex in REST. simplest is find by Title and filter logic in code or risk duplicates if title not unique.
            // Let's assume title is unique enough for now or search

            // Search by title
            let existingClaims = await fetchAPI(`/${claimCollection}?filters[title][$eq]=${encodeURIComponent(c.title)}&populate=robot`);
            // Custom filter check for robot?
            let existingClaim = existingClaims.find(claim => claim.robot?.id === robotId || claim.robot?.documentId === robotDocumentId);

            const claimPayload = {
                title: c.title,
                claim_text: c.claim_text,
                category: c.category,
                status: c.status,
                conditions: c.conditions,
                not_in_scope: c.not_in_scope,
                risk_notes: c.risk_notes,
                maturity: c.maturity,
                confidence: c.confidence,
                robot: robotId,
                evidence: (c.evidence?.connect_by_slug || []).map(s => sourceMap[s]),
            };

            if (existingClaim) {
                console.log(`Updating Claim: ${c.title}`);
                // Use documentId for update
                await fetchAPI(`/${claimCollection}/${existingClaim.documentId}`, 'PUT', claimPayload);
                claimMap[c.slug_internal] = existingClaim.id;
            } else {
                console.log(`Creating Claim: ${c.title}`);
                const newClaim = await fetchAPI(`/${claimCollection}`, 'POST', claimPayload);
                claimMap[c.slug_internal] = newClaim.id;
            }
        }

        // 6. Update Robot Components (Capabilities & FAQ)
        console.log('Updating Robot Components with Claims...');

        const capabilities = (robotData.capabilities || []).map(cap => {
            let capClaimIds = [];
            if (cap.claims?.connect_by_slug) {
                capClaimIds = cap.claims.connect_by_slug.map(slug => claimMap[slug]).filter(Boolean);
            }
            return {
                ...cap,
                claims: capClaimIds
            };
        });

        const faq = (robotData.faq || []).map(f => {
            let faqClaimIds = [];
            if (f.claims?.connect_by_slug) {
                faqClaimIds = f.claims.connect_by_slug.map(slug => claimMap[slug]).filter(Boolean);
            }
            return {
                ...f,
                claims: faqClaimIds
            };
        });

        await fetchAPI(`/${robotCollection}/${robotDocumentId}`, 'PUT', {
            capabilities,
            faq
        });

        console.log('--- Import completed successfully ---');

    } catch (error) {
        console.error('Import failed details:');
        console.error(error.message || error);
        if (error.stack) console.error(error.stack);
        fs.writeFileSync('import-error.log', `Error: ${error.message}\n${error.stack}`);
        process.exit(1);
    }
}

main();

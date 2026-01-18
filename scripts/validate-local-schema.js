const fs = require('fs');
const path = require('path');

// Paths
const dataPath = path.join(__dirname, '../robots/1x-neo.json');
const schemaDir = path.join(__dirname, '../src');

// Load Data
const data = require(dataPath);

// Helpers
function loadSchema(uid) {
    // uid format: "api::robot.robot" or "component.robot.intended-use"
    // simplistic mapping
    if (uid.startsWith('api::')) {
        const parts = uid.split('::')[1].split('.');
        const apiName = parts[0];
        const typeName = parts[1];
        const p = path.join(schemaDir, 'api', apiName, 'content-types', typeName, 'schema.json');
        if (fs.existsSync(p)) return require(p);
    } else if (uid.startsWith('robot.')) {
        const compName = uid.split('.')[1];
        const p = path.join(schemaDir, 'components', 'robot', `${compName}.json`);
        if (fs.existsSync(p)) return require(p);
    }
    return null;
}

// Output to file
const reportFile = path.join(__dirname, 'validation_report.txt');
fs.writeFileSync(reportFile, '--- Validation Report ---\n');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(reportFile, msg + '\n');
}

function validate(data, schemaUid, pathContext = '') {
    const schema = loadSchema(schemaUid);
    if (!schema) {
        log(`[ERR] Schema not found: ${schemaUid}`);
        return;
    }

    const attributes = schema.attributes;
    for (const [key, value] of Object.entries(data)) {
        if (key === 'locale') continue; // Ignore locale

        const fieldPath = pathContext ? `${pathContext}.${key}` : key;
        const attr = attributes[key];

        if (!attr) {
            log(`[WARN] Extra field in data not in schema: ${fieldPath}`);
            continue;
        }

        if (attr.type === 'component') {
            if (attr.repeatable) {
                if (!Array.isArray(value)) {
                    log(`[ERR] ${fieldPath} should be array`);
                } else {
                    value.forEach((item, idx) => validate(item, attr.component, `${fieldPath}[${idx}]`));
                }
            } else {
                validate(value, attr.component, fieldPath);
            }
        } else if (attr.type === 'enumeration') {
            if (attr.multiple) {
                if (!Array.isArray(value)) log(`[ERR] ${fieldPath} should be array`);
                else {
                    value.forEach(v => {
                        if (!attr.enum.includes(v)) log(`[ERR] Enum mismatch at ${fieldPath}: '${v}' not in [${attr.enum}]`);
                    });
                }
            } else {
                if (!attr.enum.includes(value)) log(`[ERR] Enum mismatch at ${fieldPath}: '${value}' not in [${attr.enum}]`);
            }
        }
    }
}

log('--- Validating 1x-neo.json against local schemas ---');
validate(data, 'api::robot.robot');

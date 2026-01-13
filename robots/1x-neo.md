Poniżej masz mapowanie pól (Strapi → wartości dla 1X NEO) wprost pod naszą strukturę robota. Wszystko, co wpisuję jako wartość, ma pokrycie w oficjalnych źródłach 1X. Reszta = null.

Źródła główne:

Specyfikacja + hardware/safety/compute/FAQ: strona produktu NEO

Ogłoszenie + chore list + pricing/availability + “1X Expert”: wpis “Order Today”

A) Robot (collection: robot)
0) Meta / publikacja

robot.slug → "1x-neo"

robot.review_status → "approved" (po Twojej weryfikacji)

robot.blocked_reason → null

robot.last_technical_review_at → YYYY-MM-DDTHH:mm:ssZ (po review)

robot.publishedAt → null (dopóki nie idzie live)

1) Hero

robot.name → "NEO"

robot.short_neutral_summary → np. "Humanoidalny robot domowy 1X zaprojektowany do wykonywania prac domowych i asystowania w domu."

robot.hero_image → (asset z oficjalnych materiałów 1X – wrzucasz ręcznie)

robot.gallery[] → (jw.)

robot.manufacturer → relacja → manufacturer: 1X Technologies

robot.market_status → "announced"

robot.availability_status → "preorder"

robot.regions[] → ["US"] (pierwsze dostawy gł. USA w 2026)

robot.media_disclaimer → null (opcjonalnie tekst o materiałach promocyjnych, jeśli chcesz)

2) Intended Use (component: robot.intended_use)

robot.intended_use.high_level_summary → "Robot domowy do wykonywania prac porządkowych i asysty w domu; funkcje i umiejętności rozwijane aktualizacjami oprogramowania."

robot.intended_use.declared_applications (JSON/array) →
["folding laundry","organizing shelves","tidying spaces","opening doors","fetching items","turning off lights"]

robot.intended_use.environment_type[] → ["indoor_home"]

robot.intended_use.target_user[] → ["consumer_home_owner"]

robot.intended_use.key_constraints → "Zakres umiejętności początkowo podstawowy; nowe zadania mogą wymagać sesji z 1X Expert; część funkcji rośnie wraz z aktualizacjami."

robot.intended_use.notes → "Zaprojektowany jako 'consumer-ready humanoid robot' do domu."

3) Classification (component: robot.classification)

(wartości enum u Ciebie – poniżej propozycja zgodna z tym, co wiemy)

robot.classification.form_factor → "humanoid_biped"

robot.classification.primary_domain → "home"

robot.classification.locomotion_type → "biped_walking"

robot.classification.manipulation_type → "two_hands_dexterous"

robot.classification.autonomy_level → "home_autonomy_with_human_assist" (bo 1X Expert dla nieznanych zadań)

4) Capabilities (repeatable: robot.capabilities[] → robot.capability-item)

Zasada: capabilities są “warstwą użytkową”, ale linkują do claimów.

Przykładowy zestaw (minimalny, bez marketingu):

Lokomocja / nawigacja

category → "locomotion"

title → "Poruszanie się i nawigacja w domu"

summary → "NEO używa AI do nawigacji do miejsca, w którym jest potrzebny."

conditions → "Środowisko domowe (indoor)."

risk_level → "medium"

claims[] → link do claimów: CLAIM_MOBILE, CLAIM_SPEEDS

Manipulacja / obowiązki domowe

category → "manipulation"

title → "Wykonywanie prostych prac domowych"

summary → "Składanie prania, organizowanie półek, porządkowanie przestrzeni."

conditions → "Zakres początkowo podstawowy; nieznane zadania mogą wymagać 1X Expert."

risk_level → "medium"

claims[] → CLAIM_CHORES, CLAIM_EXPERT

Interakcja (LLM + kontekst)

category → "interaction"

title → "Rozmowa i asysta (LLM, audio, pamięć, wizja)"

summary → "Wbudowany LLM do rozumienia i rozmowy; audio intelligence, visual intelligence, memory."

conditions → "Zakres i jakość zależne od software/aktualizacji."

risk_level → "low"

claims[] → CLAIM_LLM, CLAIM_AUDIO_INTEL, CLAIM_VISUAL_INTEL, CLAIM_MEMORY

5) Claims (collection: claim, relacja: robot.claims[])

Tu jest “source of truth”. Każdy claim ma źródła (sources).

Minimalny set claimów (ID/slug po Twojemu):

CLAIM_HW_SPECS (category: "specs")

claim_text → "NEO: height 5’6”, weight 66 lbs, lift 154 lbs, carry 55 lbs, arm payload 18 lbs."

status → "confirmed"

maturity → "product_spec"

confidence → "high"

evidence[] → SOURCE_1X_NEO_PAGE

CLAIM_SPEEDS

claim_text → "Hands 8.0 m/s; max run speed 6.2 m/s; walking speed 1.4 m/s."

… evidence → SOURCE_1X_NEO_PAGE

CLAIM_BATTERY

claim_text → "Battery: 842 Wh; runtime 4h; quick charge 6min per hour runtime."

CLAIM_SAFETY_BODY

claim_text → "Soft body with custom lattice polymer structure; no pinchpoints; HIC < 250; low inertia tendon drives."

CLAIM_INGRESS

claim_text → "Ingress protection: hands IP68; body IP44."

CLAIM_COMPUTE_SENSORS

claim_text → "Compute: 1X NEO Cortex (Nvidia Jetson Thor), up to 2070 FP4 TFLOPS; camera dual 8.85MP 90Hz stereo fisheye; microphones 4 beamforming; comms WiFi/Bluetooth/5G; speakers 3-stage."

CLAIM_CHORES

claim_text → "Chores feature: task list scheduling; examples: folding laundry, organizing shelves, tidying spaces."

CLAIM_EXPERT

claim_text → "For chores NEO doesn't know, owners can schedule a 1X Expert to guide it through unknown tasks."

CLAIM_AI_STACK

claim_text → "AI: Redwood AI (vision-language model for learning/performing chores), built-in LLM, audio intelligence, memory, visual intelligence."

6) Limitations (repeatable: robot.limitations[])

Wszystko musi być twarde (nie “wydaje się”). Na teraz mamy pewne, oficjalne:

limitation_type → "not_fully_autonomous_for_all_tasks"

description → "Nieznane zadania mogą wymagać zaplanowanej sesji z 1X Expert."

why_it_matters → "Użytkownik nie powinien zakładać, że robot wykona dowolną czynność bez wsparcia."

(Dodatkowe ograniczenia typu „cooking” są w FAQ na /neo, ale treści FAQ nie są rozwinięte w tym wycinku strony — jeśli chcesz, zrobię drugi krok: wyciągnę konkretne odpowiedzi z FAQ i wtedy dopniemy limitation o gotowaniu / outdoor / waterproof na 100%.)

7) Autonomy & Control (component: robot.autonomy_and_control)

Na podstawie oficjalnego opisu:

control_modes[] → ["voice","app","scheduled_tasks","expert_guided"]

cloud_dependency → null (brak twardej deklaracji “cloud required” w tych źródłach)

internet_required → null (brak jednoznacznego “required”, wiemy tylko że ma łączność)

operator_required → "sometimes" (dla nieznanych zadań przez 1X Expert)

notes → "NEO operuje autonomicznie w domu i rozwija umiejętności z czasem; nieznane zadania mogą wymagać 1X Expert."

8) Safety (component: robot.safety)

emergency_stop → null (brak potwierdzenia w źródłach powyżej)

collision_detection → null

safe_near_children → null

certifications → null

known_risks → null

notes → "Soft body (lattice polymer), no pinchpoints, HIC<250, low inertia tendon drives."

9) Environment requirements (component: robot.environment_requirements)

space → null

floor → null

lighting → null

connectivity → "WiFi/Bluetooth/5G supported."

setup → null

10) Public specs (component: robot.specs_public)

Wypełniasz tylko to, co jest na /neo:

height_cm → 168 (5’6” ≈ 167.6 cm; jeśli wolisz bez konwersji: trzymaj tekst 5’6”)

weight_kg → 30 (66 lbs ≈ 29.9 kg)

lift_kg → 70 (154 lbs ≈ 69.9 kg)

carry_kg → 25 (55 lbs ≈ 24.9 kg)

arm_payload_kg → 8 (18 lbs ≈ 8.2 kg)

battery_wh → 842

runtime_hours → 4

noise_db → 22

ip_body → "IP44"

ip_hands → "IP68"

compute_chipset → "1X NEO Cortex (Nvidia Jetson Thor)"

compute_ai_tflops_fp4 → 2070

camera → "Dual 8.85MP 90Hz Stereo Fisheye"

microphones → "4 beamforming microphones"

speakers → "3 stage speaker in pelvis and chest area"

comms[] → ["WiFi","Bluetooth","5G"]

dof → { hands:44, arms:14, neck:3, spine:2, legs:12 }

speeds → { hands_mps:8.0, walk_mps:1.4, max_run_mps:6.2 }

11) FAQ (repeatable: robot.faq[])

Na razie tylko pytania są widoczne w tym wycinku strony, bez rozwiniętych odpowiedzi.
Dlatego:

robot.faq[] → [] (do uzupełnienia po wyciągnięciu treści FAQ z pełnej strony/sekcji)

12) Related robots

robot.related_robots[] → [] (na start)

B) Sources (collection: source)

Minimum 2 rekordy źródeł, żeby claims miały evidence:

SOURCE_1X_NEO_PAGE

title → "NEO Home Robot — Product Page"

publisher → "1X Technologies"

type → "product_page"

url → https://www.1x.tech/neo

is_official → true

published_at → null (nie podane)

retrieved_at → (ustawiasz w Strapi przy imporcie)

SOURCE_1X_ANNOUNCEMENT_2025_10_28

title → "NEO Home Robot | Order Today (Announcement)"

publisher → "1X Technologies"

type → "press_release"

url → https://www.1x.tech/discover/neo-home-robot

is_official → true

published_at → "2025-10-28"

retrieved_at → (jw.)
1) Robot — payload do Strapi (api::robot.robot)
{
  "locale": "pl",
  "name": "Tesla Optimus",
  "slug": "tesla-optimus",
  "short_neutral_summary": "Tesla Optimus to rozwijany przez Teslę humanoidalny robot dwunożny do wykonywania zadań „niebezpiecznych, powtarzalnych lub nudnych”. Publicznie podawane parametry (np. wzrost, masa, udźwig, prędkość marszu, pojemność baterii) pochodzą głównie z deklaracji Tesli i wypowiedzi Elona Muska w kontekście pokazów (AI Day) i nie są obecnie jednolicie potwierdzone jako specyfikacja produktu dostępnego komercyjnie. Według relacji medialnych część prezentacji w ostatnich latach nie była w pełni autonomiczna i wykorzystywała zdalnych operatorów.",
  "market_status": "limited_real_world",
  "availability_status": "not_available",
  "regions": ["US"],
  "review_status": "needs_review",
  "blocked_reason": null,
  "last_technical_review_at": null,

  "hero_image": null,
  "gallery": [],
  "media_disclaimer": "demo",

  "manufacturer": {
    "lookup": { "name": "Tesla" }
  },

  "sources": {
    "connect_by_slug": [
      "tesla-ai-robotics",
      "latimes-tesla-ai-day-2022-optimus",
      "cleantechnica-optimus-specs-2022",
      "forbes-optimus-specs-battery-2022",
      "ieee-spectrum-robotics-experts-optimus",
      "businessinsider-optimus-teleop-2025"
    ]
  },

  "related_robots": [],
  "key_terms": [],

  "classification": {
    "form_factor": "humanoid_biped",
    "primary_domain": "industrial",
    "locomotion_type": "biped_walking",
    "manipulation_level": "dexterous",
    "autonomy_level": "teleop",
    "cloud_dependency": "unknown",
    "sdk_api": "unknown"
  },

  "specs_public": {
    "height_cm": 173,
    "weight_kg": 57,
    "payload_kg": 20,
    "runtime_min": null,
    "charging_time_min": null,
    "sensors_public": {
      "notes": [
        "Tesla opisuje rozwój stosu percepcji i planowania dla robota dwunożnego, ale na stronie Tesla AI & Robotics nie publikuje pełnej listy sensorów ani ich parametrów.",
        "W materiałach prasowych pojawiają się opisy oparcia o wizję komputerową, jednak liczba i typ kamer/sensorów nie mają tu jednej, oficjalnej tabeli specyfikacji."
      ]
    },
    "power": "Zasilanie bateryjne (deklarowane 2,3 kWh w materiałach z okresu AI Day 2022).",
    "lift_kg": 68,
    "carry_kg": 20,
    "arm_payload_kg": null,
    "battery_wh": 2300,
    "runtime_hours": null,
    "noise_db": null,
    "ip_body": null,
    "ip_hands": null,
    "compute_chipset": "Brak publicznej, stabilnej specyfikacji układu obliczeniowego w oficjalnej tabeli produktu; Tesla komunikuje prace nad stosami AI dla percepcji, planowania i sterowania.",
    "compute_ai_tflops_fp4": null,
    "camera": "Brak jednej, oficjalnej specyfikacji kamery/kamer w tabeli produktu.",
    "microphones": null,
    "speakers": null,
    "comms": null,
    "dof": {
      "notes": [
        "Publicznie pojawiają się informacje o rozwoju dłoni (np. 11 DoF w Gen 2 oraz docelowo więcej), ale brak jednej, oficjalnej i aktualnej tabeli DoF dla całego robota."
      ]
    },
    "speeds": {
      "walking_speed_m_s": 2.24,
      "notes": [
        "Wartość 2,24 m/s odpowiada deklarowanemu celowi „5 mph” dla marszu; brak publicznej metodologii i warunków pomiaru."
      ]
    },
    "sdk_api": "unknown",
    "data_completeness": "medium",
    "notes": "<p>Wartości liczbowe (wzrost/masa/udźwig/prędkość/bateria) pochodzą z deklaracji Tesli i relacji z AI Day (2021–2022) oraz późniejszych omówień. Tesla nie prowadzi publicznej „karty katalogowej” z pełną specyfikacją produkcyjną Optimusa. Z tego powodu część parametrów należy traktować jako cele/założenia, a nie gwarantowaną specyfikację produktu rynkowego.</p>"
  },

  "intended_use": {
    "declared_applications": [
      {
        "name": "Zadania niebezpieczne, powtarzalne lub nudne",
        "examples": [
          "prace pomocnicze w środowisku przemysłowym (koncepcja)",
          "proste czynności logistyczne lub manipulacyjne (koncepcja)"
        ]
      }
    ],
    "high_level_summary": "Robot humanoidalny rozwijany przez Teslę jako platforma ogólnego przeznaczenia do zadań niebezpiecznych/powtarzalnych/nudnych.",
    "key_constraints": "Brak publicznej, stabilnej specyfikacji produkcyjnej oraz brak potwierdzonej dostępności komercyjnej. Według relacji medialnych na części pokazów występował człowiek w pętli (teleoperacja).",
    "environment_type": ["controlled_space"],
    "target_user": ["enthusiast"],
    "notes": "<p>Tesla opisuje cel: „general purpose, bi-pedal, autonomous humanoid robot” do zadań niebezpiecznych, powtarzalnych lub nudnych. Publiczne materiały nie stanowią pełnej specyfikacji produktu dostępnego na rynku.</p>"
  },

  "capabilities": [
    {
      "title": "Deklarowany cel: wykonywanie zadań niebezpiecznych, powtarzalnych lub nudnych",
      "category": "autonomy",
      "summary": "Tesla komunikuje, że celem projektu Optimus jest ogólnego przeznaczenia robot humanoidalny do zadań niebezpiecznych, powtarzalnych lub nudnych.",
      "conditions": "To deklaracja celu projektu; nie jest to lista gwarantowanych umiejętności w produkcie rynkowym.",
      "risk_level": "medium",
      "claims": { "connect_by_slug_internal": ["claim-optimus-goal-tasks-tesla"] },
      "notes_internal": "Utrzymywać język jako „cel/deklaracja” bez obietnic konkretnego zakresu prac."
    },
    {
      "title": "Lokomocja: deklarowany cel prędkości marszu ok. 5 mph",
      "category": "locomotion",
      "summary": "W relacjach z AI Day pojawia się deklaracja celu prędkości marszu ~5 mph (ok. 2,24 m/s).",
      "conditions": "Brak publicznej metodologii; wartość należy traktować jako cel/założenie z wczesnych komunikatów.",
      "risk_level": "medium",
      "claims": { "connect_by_slug_internal": ["claim-optimus-walk-speed-5mph"] },
      "notes_internal": "Nie przedstawiać jako ‘zmierzona’ prędkość w domu/na hali."
    },
    {
      "title": "Manipulacja: deklarowany udźwig przenoszenia 20 kg i „deadlift” 68 kg",
      "category": "manipulation",
      "summary": "W publicznych relacjach pojawia się informacja o przenoszeniu ok. 20 kg oraz „deadlift” ok. 68 kg.",
      "conditions": "Brak publicznej metodologii (pozycja robota, dynamika, czas utrzymania).",
      "risk_level": "high",
      "claims": {
        "connect_by_slug_internal": [
          "claim-optimus-carry-20kg",
          "claim-optimus-deadlift-68kg"
        ]
      },
      "notes_internal": "Ryzyko nadinterpretacji — ‘deadlift’ nie oznacza bezpiecznej manipulacji ciężkimi obiektami w realnym środowisku."
    },
    {
      "title": "Autonomia w praktyce: możliwy człowiek w pętli na pokazach",
      "category": "autonomy",
      "summary": "Według relacji medialnych część publicznych prezentacji Optimusa nie była w pełni autonomiczna i wykorzystywała zdalnych operatorów.",
      "conditions": "Dotyczy konkretnych pokazów i okresów rozwoju; nie przesądza o docelowej architekturze.",
      "risk_level": "high",
      "claims": { "connect_by_slug_internal": ["claim-optimus-teleop-at-events"] },
      "notes_internal": "To kluczowa informacja do sekcji ‘ograniczenia’ i do tonowania oczekiwań."
    }
  ],

  "limitations": [
    {
      "title": "Brak komercyjnej dostępności i brak finalnej specyfikacji produktu",
      "limitation_type": "unstable",
      "description": "Optimus nie ma publicznie dostępnej, stabilnej karty katalogowej produktu oraz nie jest oferowany komercyjnie dla konsumentów.",
      "why_it_matters": "Trudno porównywać z produktami rynkowymi; część parametrów to cele/założenia z wczesnych komunikatów."
    },
    {
      "title": "Autonomia nie jest jednoznacznie potwierdzona jako ‘bez nadzoru’",
      "limitation_type": "not_fully_autonomous_for_all_tasks",
      "description": "Według relacji medialnych część pokazów wykorzystywała zdalnych operatorów (teleop), więc nie można traktować demonstracji jako dowodu pełnej autonomii w realnym świecie.",
      "why_it_matters": "To wpływa na realne oczekiwania co do wdrożeń i bezpieczeństwa w przestrzeni współdzielonej z ludźmi."
    },
    {
      "title": "Wysoka wrażliwość na środowisko (typowa dla humanoidów)",
      "limitation_type": "environment_sensitive",
      "description": "Roboty dwunożne są zwykle wrażliwe na śliskie podłoże, przeszkody, luźne elementy (kable, dywaniki) i zatłoczone przejścia; Tesla nie publikuje tu granicznych parametrów środowiskowych.",
      "why_it_matters": "Bez jawnych limitów trudno ocenić niezawodność poza kontrolowanym środowiskiem."
    }
  ],

  "autonomy_and_control": {
    "control_modes": ["teleop", "semi_autonomous", "autonomous"],
    "cloud_dependency": "unknown",
    "internet_required": "sometimes",
    "operator_required": "sometimes",
    "notes": "<p>Tesla deklaruje cel robota autonomicznego, ale relacje medialne wskazują, że na części pokazów wykorzystywano zdalnych operatorów. Z tego powodu zakładamy, że w praktyce mogą występować tryby teleop i praca z operatorem w pętli.</p>"
  },

  "safety": {
    "emergency_stop": "unknown",
    "collision_detection": "unknown",
    "safe_near_children": "unknown",
    "certifications": [],
    "known_risks": [
      "Ryzyko kolizji i upadków typowe dla humanoidów w przestrzeni współdzielonej z ludźmi.",
      "Ryzyko nadinterpretacji demonstracji jako dowodu pełnej autonomii.",
      "Ryzyko operacyjne przy teleoperacji (opóźnienia sieci, błędy operatora)."
    ],
    "notes": "<p>Tesla nie publikuje w jednym miejscu formalnych certyfikacji bezpieczeństwa dla produktu rynkowego Optimus ani jednoznacznych informacji o mechanizmach typu E-STOP / detekcja kolizji w wersji produkcyjnej.</p>"
  },

  "environment_requirements": {
    "space_requirements": "Zakładaj środowisko jak dla człowieka: odpowiednia szerokość przejść, brak ciasnych zwężeń i wolna strefa manewrowa. Brak publicznych wymagań minimalnych od Tesli.",
    "lighting_constraints": "Brak publicznych wymagań liczbowych; jeżeli percepcja opiera się na wizji, trudne będą: słabe światło, odblaski i szybkie zmiany oświetlenia.",
    "floor_constraints": "Konserwatywnie: unikać śliskich i mokrych podłóg oraz luźnych dywaników/kabli; brak publicznych limitów od Tesli.",
    "connectivity": "Brak publicznych wymagań. Jeśli występuje teleop/diagnostyka zdalna, Internet może być potrzebny przynajmniej czasami.",
    "setup_requirements": "Brak publicznego procesu instalacji dla użytkownika końcowego; prawdopodobnie konfiguracja jest wewnętrzna (laboratorium/hala)."
  },

  "faq": [
    {
      "question": "Czy Tesla Optimus jest dostępny do kupienia?",
      "answer_short": "Nie. Na dziś nie jest to produkt komercyjnie dostępny dla konsumentów.",
      "answer_conditions": "Tesla publikuje informacje o projekcie i pokazach, ale bez oferty sprzedaży detalicznej i bez stabilnej specyfikacji produktu rynkowego.",
      "answer_not_possible": null,
      "confidence": "high",
      "claims": { "connect_by_slug_internal": ["claim-optimus-not-commercially-available"] }
    },
    {
      "question": "Czy Optimus jest w pełni autonomiczny?",
      "answer_short": "Nie ma jednoznacznego, publicznego potwierdzenia pełnej autonomii bez nadzoru we wszystkich scenariuszach; relacje medialne wskazują na użycie teleoperacji na części pokazów.",
      "answer_conditions": "Docelowym celem Tesli jest autonomia, ale demonstracje mogą obejmować człowieka w pętli.",
      "answer_not_possible": null,
      "confidence": "medium",
      "claims": { "connect_by_slug_internal": ["claim-optimus-teleop-at-events", "claim-optimus-goal-tasks-tesla"] }
    },
    {
      "question": "Jakie są publicznie podawane parametry (wzrost/masa/udźwig/prędkość/bateria)?",
      "answer_short": "W relacjach z AI Day i wypowiedziach Tesli/Muska pojawiają się: wzrost ok. 173 cm, masa ok. 57 kg, przenoszenie ok. 20 kg, „deadlift” ok. 68 kg, cel prędkości marszu ~5 mph oraz bateria ok. 2,3 kWh.",
      "answer_conditions": "To przede wszystkim deklaracje/cele z okresu pokazów; Tesla nie publikuje jednej, aktualnej tabeli specyfikacji produkcyjnej.",
      "answer_not_possible": null,
      "confidence": "medium",
      "claims": {
        "connect_by_slug_internal": [
          "claim-optimus-height-173cm",
          "claim-optimus-weight-57kg",
          "claim-optimus-carry-20kg",
          "claim-optimus-deadlift-68kg",
          "claim-optimus-walk-speed-5mph",
          "claim-optimus-battery-2p3kwh"
        ]
      }
    }
  ],

  "expert_summary": {
    "who_is_it_for": "Dla obserwujących rozwój humanoidów i automatyzacji w przemyśle (monitorowanie technologii), a nie dla użytkowników szukających gotowego produktu do kupienia.",
    "who_is_it_not_for": "Nie dla praktycznych użytkowników domowych ani firm oczekujących gotowej, certyfikowanej platformy dostępnej komercyjnie już teraz.",
    "top_risks": [
      "Brak komercyjnej dostępności i brak stabilnej karty katalogowej produktu.",
      "Ryzyko mylenia demonstracji z autonomią bez nadzoru (teleop/człowiek w pętli).",
      "Nieznane parametry bezpieczeństwa i certyfikacje wersji produkcyjnej."
    ],
    "recommendation_level": "watch_only",
    "final_note": "W obecnym stanie Optimus jest projektem w fazie rozwoju i prezentacji, a nie produktem konsumenckim. Dane liczbowe należy traktować jako deklaracje/cele z komunikacji Tesli, dopóki nie pojawi się specyfikacja produkcyjna i niezależne testy."
  },

  "notes_internal": "<p>Ustawienia konserwatywne: market_status=limited_real_world (pokazy i prace rozwojowe), availability_status=not_available (brak sprzedaży). Klucz do aktualizacji: jeśli Tesla opublikuje stabilną kartę specyfikacji lub wejdą oficjalne wdrożenia komercyjne, wtedy podnosimy do pilot/available i aktualizujemy claimy.</p>"
}


Cytowania do kluczowych tez:

Cel projektu (zadania „unsafe, repetitive or boring”) — Tesla AI & Robotics.

Parametry z komunikacji (173 cm/57 kg/20 kg/68 kg/5 mph) — relacje: LA Times + CleanTechnica.

Bateria 2,3 kWh — Forbes + IEEE Spectrum (w tym komentarz, że „full day’s work” brzmi wątpliwie).

Teleop/człowiek w pętli na pokazach — Business Insider.

2) Sources — do utworzenia / podpięcia w robot.sources

Nie znam Twojego schematu api::source.source, więc trzymam format jak wcześniej (slug/title/publisher/url/type).

{
  "sources_to_create": [
    {
      "slug": "tesla-ai-robotics",
      "title": "Tesla — AI & Robotics: opis celu projektu Tesla Optimus",
      "publisher": "Tesla",
      "url": "https://www.tesla.com/AI",
      "type": "official_product_page"
    },
    {
      "slug": "latimes-tesla-ai-day-2022-optimus",
      "title": "Los Angeles Times — relacja z Tesla AI Day 2022 (wzrost/masa/udźwig jako deklaracje)",
      "publisher": "Los Angeles Times",
      "url": "https://www.latimes.com/business/story/2022-09-30/tesla-ai-day",
      "type": "news"
    },
    {
      "slug": "cleantechnica-optimus-specs-2022",
      "title": "CleanTechnica — omówienie deklarowanych parametrów Tesli dla Optimusa (173 cm, 57 kg, 20 kg carry, 68 kg deadlift)",
      "publisher": "CleanTechnica",
      "url": "https://cleantechnica.com/2022/03/30/tesla-bot-optimus-its-impact-on-our-future/",
      "type": "analysis"
    },
    {
      "slug": "forbes-optimus-specs-battery-2022",
      "title": "Forbes — podsumowanie informacji o Optimus (m.in. bateria 2,3 kWh i cele energetyczne)",
      "publisher": "Forbes",
      "url": "https://www.forbes.com/sites/johnkoetsier/2022/10/01/tesla-bot-optimus-everything-we-know-so-far/",
      "type": "analysis"
    },
    {
      "slug": "ieee-spectrum-robotics-experts-optimus",
      "title": "IEEE Spectrum — komentarze ekspertów dot. Optimus (m.in. bateria 2,3 kWh i krytyka deklaracji „full day’s work”)",
      "publisher": "IEEE Spectrum",
      "url": "https://spectrum.ieee.org/robotics-experts-tesla-bot-optimus/gary-marcus",
      "type": "analysis"
    },
    {
      "slug": "businessinsider-optimus-teleop-2025",
      "title": "Business Insider — relacja o Optimus (w tym informacja, że na pokazie w 2024 roboty nie były w pełni autonomiczne i polegały na zdalnych operatorach)",
      "publisher": "Business Insider",
      "url": "https://www.businessinsider.com/optimus-tesla-humanoid-robot-elon-musk-growth-plans-2025-9",
      "type": "news"
    }
  ]
}

3) Claimy do utworzenia (api::claim.claim) — w Twoim schemacie

Dodaję pole pomocnicze slug_internal tylko do mapowania importu (nie ma go w schemacie claim).

{
  "claims_to_create": [
    {
      "title": "Cel projektu: robot do zadań niebezpiecznych, powtarzalnych lub nudnych",
      "claim_text": "Tesla deklaruje, że celem projektu Optimus jest ogólnego przeznaczenia, dwunożny robot humanoidalny zdolny do wykonywania zadań niebezpiecznych, powtarzalnych lub nudnych.",
      "category": "autonomy",
      "status": "verified",
      "conditions": "To deklaracja celu projektu (nie lista gwarantowanych funkcji produktu rynkowego).",
      "not_in_scope": "Nie przesądza, jakie konkretne zadania i z jaką skutecznością robot wykona dziś lub w wersji produkcyjnej.",
      "risk_notes": "Ryzyko nadinterpretacji jako obietnicy konkretnego zestawu umiejętności.",
      "maturity": "prototype",
      "confidence": "high",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["tesla-ai-robotics"] },
      "slug_internal": "claim-optimus-goal-tasks-tesla"
    },

    {
      "title": "Wzrost ok. 173 cm (deklaracja z komunikacji Tesli/AIDay)",
      "claim_text": "W relacjach z AI Day i w komunikacji o Optimus pojawia się wartość wzrostu ok. 173 cm (5'8\").",
      "category": "other",
      "status": "verified",
      "conditions": "Traktować jako wartość deklarowaną w kontekście pokazu/założeń; brak stabilnej karty katalogowej produktu.",
      "not_in_scope": "Nie jest to potwierdzona specyfikacja wersji produkcyjnej.",
      "risk_notes": "Wartości mogą się zmieniać między generacjami prototypów.",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["latimes-tesla-ai-day-2022-optimus", "cleantechnica-optimus-specs-2022"] },
      "slug_internal": "claim-optimus-height-173cm"
    },

    {
      "title": "Masa ok. 57 kg (deklaracja z komunikacji Tesli/AIDay)",
      "claim_text": "W relacjach z AI Day i w komunikacji o Optimus pojawia się masa ok. 57 kg (125 lb).",
      "category": "other",
      "status": "verified",
      "conditions": "Wartość deklarowana; brak publicznej, aktualnej tabeli specyfikacji produkcyjnej.",
      "not_in_scope": "Nie przesądza o masie docelowej wersji produkcyjnej.",
      "risk_notes": "Masa zależy od generacji prototypu i osprzętu.",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["latimes-tesla-ai-day-2022-optimus", "cleantechnica-optimus-specs-2022"] },
      "slug_internal": "claim-optimus-weight-57kg"
    },

    {
      "title": "Przenoszenie (carry) ok. 20 kg",
      "claim_text": "W relacjach z AI Day i w omówieniach deklaracji Tesli pojawia się przenoszenie (carry) ok. 20 kg (45 lb).",
      "category": "manipulation",
      "status": "verified",
      "conditions": "Brak metodologii: zasięg, prędkość ruchu, stabilność, czas przenoszenia.",
      "not_in_scope": "Nie oznacza bezpiecznego przenoszenia dowolnych obiektów o tej masie w realnym środowisku.",
      "risk_notes": "Ryzyko nadmiernych oczekiwań i niebezpiecznego użycia.",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["latimes-tesla-ai-day-2022-optimus", "cleantechnica-optimus-specs-2022"] },
      "slug_internal": "claim-optimus-carry-20kg"
    },

    {
      "title": "„Deadlift” ok. 68 kg",
      "claim_text": "W relacjach z AI Day i w omówieniach deklaracji Tesli pojawia się „deadlift” ok. 68 kg (150 lb).",
      "category": "manipulation",
      "status": "verified",
      "conditions": "Brak metodologii: punkt zaczepu, pozycja robota, czas utrzymania, dynamika, margines bezpieczeństwa.",
      "not_in_scope": "Nie oznacza, że robot bezpiecznie podniesie ciężkie, nieporęczne obiekty w ciasnych warunkach.",
      "risk_notes": "Bardzo łatwo o mylne wnioski dot. realnej użyteczności i bezpieczeństwa.",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["cleantechnica-optimus-specs-2022"] },
      "slug_internal": "claim-optimus-deadlift-68kg"
    },

    {
      "title": "Cel prędkości marszu ok. 5 mph (ok. 2,24 m/s)",
      "claim_text": "W relacjach z AI Day pojawia się cel prędkości marszu ok. 5 mph (ok. 2,24 m/s).",
      "category": "locomotion",
      "status": "verified",
      "conditions": "Wartość deklarowana; brak warunków pomiaru (nawierzchnia, obciążenie, tryb, stabilność).",
      "not_in_scope": "Nie oznacza bezpiecznej prędkości poruszania się w typowym domu lub zatłoczonej hali.",
      "risk_notes": "Ryzyko błędnych porównań i oczekiwań. W praktyce prędkość może być ograniczana przez bezpieczeństwo.",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["forbes-optimus-specs-battery-2022", "cleantechnica-optimus-specs-2022"] },
      "slug_internal": "claim-optimus-walk-speed-5mph"
    },

    {
      "title": "Bateria ok. 2,3 kWh (deklaracja z okresu AI Day)",
      "claim_text": "W publicznych omówieniach informacji Tesli o Optimus pojawia się pojemność baterii ok. 2,3 kWh (w kontekście AI Day / wczesnych założeń).",
      "category": "power",
      "status": "verified",
      "conditions": "Wartość dotyczy okresu wczesnych prototypów/założeń; brak stabilnej specyfikacji produkcyjnej.",
      "not_in_scope": "Nie przesądza o czasie pracy w realnych zadaniach ani o parametrach baterii w kolejnych generacjach.",
      "risk_notes": "IEEE Spectrum przytacza krytyczne opinie, że deklaracja „pełnego dnia pracy” przy tej pojemności może być zbyt optymistyczna (zależne od obciążenia).",
      "maturity": "prototype",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["forbes-optimus-specs-battery-2022", "ieee-spectrum-robotics-experts-optimus"] },
      "slug_internal": "claim-optimus-battery-2p3kwh"
    },

    {
      "title": "Na części pokazów: brak pełnej autonomii, możliwa teleoperacja",
      "claim_text": "Według relacji medialnych na części pokazów Optimusa roboty nie były w pełni autonomiczne i korzystały ze zdalnych operatorów.",
      "category": "autonomy",
      "status": "verified",
      "conditions": "Dotyczy konkretnych pokazów i okresów rozwoju; nie jest to dowód, że projekt nie dąży do autonomii.",
      "not_in_scope": "Nie przesądza, jaki jest obecny poziom autonomii w laboratorium ani jak wygląda wewnętrzna wersja Tesli w zakładach.",
      "risk_notes": "To istotne dla oczekiwań: demonstracje nie są równoznaczne z wdrożeniem autonomii bez nadzoru.",
      "maturity": "limited_real_world",
      "confidence": "medium",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["businessinsider-optimus-teleop-2025"] },
      "slug_internal": "claim-optimus-teleop-at-events"
    },

    {
      "title": "Brak sprzedaży komercyjnej dla konsumentów (stan na dziś)",
      "claim_text": "Tesla nie oferuje Optimusa jako produktu do kupienia dla konsumentów (brak publicznej oferty sprzedaży detalicznej).",
      "category": "other",
      "status": "verified",
      "conditions": "Dotyczy stanu obecnego: Tesla publikuje stronę projektu i materiały rekrutacyjne, ale bez sprzedaży detalicznej robota.",
      "not_in_scope": "Nie przesądza o przyszłych planach cenowych ani o ewentualnych wdrożeniach B2B.",
      "risk_notes": "Ryzyko mylenia projektu R&D z produktem rynkowym.",
      "maturity": "prototype",
      "confidence": "high",
      "robot": { "connect_by_slug": "tesla-optimus" },
      "evidence": { "connect_by_slug": ["tesla-ai-robotics"] },
      "slug_internal": "claim-optimus-not-commercially-available"
    }
  ],
  "uwaga_techniczna": "slug_internal jest tylko do mapowania w imporcie (nie jest polem w Strapi). Po utworzeniu claimów pobierz ich id i podepnij relacje."
}

4) Mapowanie claimów do capabilities[].claims i faq[].claims
{
  "claims_mapping_for_robot_components": {
    "capabilities": [
      {
        "title_match": "Deklarowany cel: wykonywanie zadań niebezpiecznych, powtarzalnych lub nudnych",
        "connect_claims_by_slug_internal": ["claim-optimus-goal-tasks-tesla"]
      },
      {
        "title_match": "Lokomocja: deklarowany cel prędkości marszu ok. 5 mph",
        "connect_claims_by_slug_internal": ["claim-optimus-walk-speed-5mph"]
      },
      {
        "title_match": "Manipulacja: deklarowany udźwig przenoszenia 20 kg i „deadlift” 68 kg",
        "connect_claims_by_slug_internal": ["claim-optimus-carry-20kg", "claim-optimus-deadlift-68kg"]
      },
      {
        "title_match": "Autonomia w praktyce: możliwy człowiek w pętli na pokazach",
        "connect_claims_by_slug_internal": ["claim-optimus-teleop-at-events"]
      }
    ],
    "faq": [
      {
        "question_match": "Czy Tesla Optimus jest dostępny do kupienia?",
        "connect_claims_by_slug_internal": ["claim-optimus-not-commercially-available"]
      },
      {
        "question_match": "Czy Optimus jest w pełni autonomiczny?",
        "connect_claims_by_slug_internal": ["claim-optimus-teleop-at-events", "claim-optimus-goal-tasks-tesla"]
      },
      {
        "question_match": "Jakie są publicznie podawane parametry (wzrost/masa/udźwig/prędkość/bateria)?",
        "connect_claims_by_slug_internal": [
          "claim-optimus-height-173cm",
          "claim-optimus-weight-57kg",
          "claim-optimus-carry-20kg",
          "claim-optimus-deadlift-68kg",
          "claim-optimus-walk-speed-5mph",
          "claim-optimus-battery-2p3kwh"
        ]
      }
    ]
  }
}
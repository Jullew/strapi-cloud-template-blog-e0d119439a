Struktura plików
src/
  api/
    manufacturer/content-types/manufacturer/schema.json
    robot/content-types/robot/schema.json
    source/content-types/source/schema.json
    claim/content-types/claim/schema.json
  components/
    shared/term.json
    robot/intended-use.json
    robot/capability-item.json
    robot/limitation-item.json
    robot/autonomy.json
    robot/safety.json
    robot/environment.json
    robot/specs.json
    robot/faq-item.json
    robot/expert-summary.json
    robot/classification.json

A) CONTENT TYPES — SCHEMA.JSON
1) manufacturer — src/api/manufacturer/content-types/manufacturer/schema.json
{
  "kind": "collectionType",
  "collectionName": "manufacturers",
  "info": {
    "singularName": "manufacturer",
    "pluralName": "manufacturers",
    "displayName": "Manufacturer",
    "description": "Robot manufacturer"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": false
    }
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true,
      "unique": true
    },
    "country": {
      "type": "string"
    },
    "website_url": {
      "type": "string"
    },
    "logo": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"]
    },
    "notes_internal": {
      "type": "richtext",
      "private": true
    },
    "robots": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::robot.robot",
      "mappedBy": "manufacturer"
    }
  }
}

2) source — src/api/source/content-types/source/schema.json
{
  "kind": "collectionType",
  "collectionName": "sources",
  "info": {
    "singularName": "source",
    "pluralName": "sources",
    "displayName": "Source",
    "description": "Evidence / references for robots and claims"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": false
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "type": {
      "type": "enumeration",
      "enum": [
        "official_doc",
        "spec_sheet",
        "official_video",
        "conference_talk",
        "press_release",
        "engineering_paper",
        "independent_test"
      ],
      "required": true
    },
    "publisher": {
      "type": "string"
    },
    "url": {
      "type": "string",
      "required": true
    },
    "published_at": {
      "type": "datetime"
    },
    "retrieved_at": {
      "type": "datetime",
      "required": false
    },
    "access": {
      "type": "enumeration",
      "enum": ["public", "registration", "paywalled", "internal"],
      "default": "public"
    },
    "is_official": {
      "type": "boolean",
      "default": false
    },
    "evidence_quality": {
      "type": "enumeration",
      "enum": [
        "A_official_spec",
        "B_official_demo",
        "C_third_party_test",
        "D_marketing_claim"
      ]
    },
    "quote_or_timestamp": {
      "type": "string"
    },
    "notes": {
      "type": "richtext"
    },
    "robots": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::robot.robot",
      "mappedBy": "sources"
    },
    "claims": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::claim.claim",
      "mappedBy": "evidence"
    }
  }
}

3) claim — src/api/claim/content-types/claim/schema.json
{
  "kind": "collectionType",
  "collectionName": "claims",
  "info": {
    "singularName": "claim",
    "pluralName": "claims",
    "displayName": "Claim",
    "description": "Single technical claim (source of truth) with evidence"
  },
  "options": {
    "draftAndPublish": false
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "claim_text": {
      "type": "text",
      "required": true
    },
    "category": {
      "type": "enumeration",
      "enum": [
        "locomotion",
        "manipulation",
        "perception",
        "hri",
        "autonomy",
        "safety",
        "power",
        "other"
      ],
      "required": true
    },
    "status": {
      "type": "enumeration",
      "enum": ["verified", "needs_clarification", "false_or_misleading"],
      "required": true,
      "default": "needs_clarification"
    },
    "conditions": {
      "type": "text"
    },
    "not_in_scope": {
      "type": "text"
    },
    "risk_notes": {
      "type": "text"
    },
    "maturity": {
      "type": "enumeration",
      "enum": ["prototype", "limited_real_world", "consumer_ready"],
      "required": true,
      "default": "prototype"
    },
    "confidence": {
      "type": "enumeration",
      "enum": ["high", "medium", "low"],
      "required": true,
      "default": "medium"
    },
    "robot": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::robot.robot",
      "inversedBy": "claims",
      "required": true
    },
    "evidence": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::source.source",
      "inversedBy": "claims"
    }
  }
}


Uwaga: pluginOptions.i18n.localized=true dla claim pozwala mieć tłumaczenia claimów w przyszłości (dziś trzymasz tylko PL).

4) robot — src/api/robot/content-types/robot/schema.json
{
  "kind": "collectionType",
  "collectionName": "robots",
  "info": {
    "singularName": "robot",
    "pluralName": "robots",
    "displayName": "Robot",
    "description": "Robot detail page data"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "slug": {
      "type": "uid",
      "targetField": "name",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "short_neutral_summary": {
      "type": "text",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "market_status": {
      "type": "enumeration",
      "enum": ["prototype", "beta", "limited_real_world", "consumer_ready"],
      "required": true,
      "default": "prototype",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "availability_status": {
      "type": "enumeration",
      "enum": ["not_available", "preorder", "pilot", "available"],
      "required": true,
      "default": "not_available",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "regions": {
      "type": "enumeration",
      "enum": ["PL", "EU", "US", "other"],
      "multiple": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "review_status": {
      "type": "enumeration",
      "enum": ["draft", "needs_review", "approved", "blocked"],
      "required": true,
      "default": "draft",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "blocked_reason": {
      "type": "text",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },
    "last_technical_review_at": {
      "type": "datetime",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "hero_image": {
      "type": "media",
      "multiple": false,
      "allowedTypes": ["images"],
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "gallery": {
      "type": "media",
      "multiple": true,
      "allowedTypes": ["images", "videos"],
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },
    "media_disclaimer": {
      "type": "enumeration",
      "enum": ["render", "demo", "real_photo", "mixed"],
      "default": "mixed",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "manufacturer": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::manufacturer.manufacturer",
      "inversedBy": "robots",
      "required": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "sources": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::source.source",
      "inversedBy": "robots",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "claims": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::claim.claim",
      "mappedBy": "robot",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "related_robots": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::robot.robot",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "intended_use": {
      "type": "component",
      "repeatable": false,
      "component": "robot.intended-use",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "capabilities": {
      "type": "component",
      "repeatable": true,
      "component": "robot.capability-item",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "limitations": {
      "type": "component",
      "repeatable": true,
      "component": "robot.limitation-item",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "autonomy_and_control": {
      "type": "component",
      "repeatable": false,
      "component": "robot.autonomy",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "safety": {
      "type": "component",
      "repeatable": false,
      "component": "robot.safety",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "environment_requirements": {
      "type": "component",
      "repeatable": false,
      "component": "robot.environment",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "specs_public": {
      "type": "component",
      "repeatable": false,
      "component": "robot.specs",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "faq": {
      "type": "component",
      "repeatable": true,
      "component": "robot.faq-item",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "expert_summary": {
      "type": "component",
      "repeatable": false,
      "component": "robot.expert-summary",
      "pluginOptions": {
        "i18n": {
          "localized": true
        }
      }
    },

    "key_terms": {
      "type": "component",
      "repeatable": true,
      "component": "shared.term",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "classification": {
      "type": "component",
      "repeatable": false,
      "component": "robot.classification",
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    },

    "notes_internal": {
      "type": "richtext",
      "private": true,
      "pluginOptions": {
        "i18n": {
          "localized": false
        }
      }
    }
  }
}

B) COMPONENTS — COMPLETE JSON
shared.term — src/components/shared/term.json
{
  "collectionName": "components_shared_terms",
  "info": {
    "displayName": "Term",
    "description": "Standardized term/tag for filtering and AI answers"
  },
  "options": {},
  "attributes": {
    "value": {
      "type": "string",
      "required": true
    },
    "label": {
      "type": "string"
    },
    "type": {
      "type": "enumeration",
      "enum": ["feature", "limitation", "sensor", "use_case", "other"],
      "required": true,
      "default": "feature"
    }
  }
}

robot.intended-use — src/components/robot/intended-use.json
{
  "collectionName": "components_robot_intended_uses",
  "info": {
    "displayName": "Intended Use",
    "description": "Declared use cases and context"
  },
  "options": {},
  "attributes": {
    "declared_applications": {
      "type": "json"
    },
    "environment_type": {
      "type": "enumeration",
      "enum": ["apartment", "house", "controlled_space"],
      "multiple": true
    },
    "target_user": {
      "type": "enumeration",
      "enum": ["family", "enthusiast", "caregiver"],
      "multiple": true
    },
    "notes": {
      "type": "richtext"
    }
  }
}


Jeśli nie chcesz JSON nigdzie: declared_applications zamień na repeatable component “string item”. Strapi nie ma „repeatable string”, więc najczęściej daje się JSON albo osobny component. Tu JSON jest OK, bo to nie jest filtr/porównanie.

robot.capability-item — src/components/robot/capability-item.json
{
  "collectionName": "components_robot_capability_items",
  "info": {
    "displayName": "Capability Item",
    "description": "Capability as presentation layer linked to claims"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "category": {
      "type": "enumeration",
      "enum": ["locomotion", "manipulation", "perception", "hri", "autonomy", "other"],
      "required": true
    },
    "summary": {
      "type": "text",
      "required": true
    },
    "conditions": {
      "type": "text",
      "required": true
    },
    "risk_level": {
      "type": "enumeration",
      "enum": ["low", "medium", "high"],
      "default": "medium"
    },
    "claims": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::claim.claim"
    },
    "notes_internal": {
      "type": "text",
      "private": true
    }
  }
}

robot.limitation-item — src/components/robot/limitation-item.json
{
  "collectionName": "components_robot_limitation_items",
  "info": {
    "displayName": "Limitation Item",
    "description": "Mandatory limitation/constraints section"
  },
  "options": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "limitation_type": {
      "type": "enumeration",
      "enum": ["cannot_do", "unstable", "environment_sensitive", "requires_supervision"],
      "required": true
    },
    "description": {
      "type": "text",
      "required": true
    },
    "why_it_matters": {
      "type": "text"
    }
  }
}

robot.autonomy — src/components/robot/autonomy.json
{
  "collectionName": "components_robot_autonomies",
  "info": {
    "displayName": "Autonomy & Control",
    "description": "Control modes and dependencies"
  },
  "options": {},
  "attributes": {
    "control_modes": {
      "type": "enumeration",
      "enum": ["manual", "teleop", "semi_autonomous", "autonomous"],
      "multiple": true
    },
    "cloud_dependency": {
      "type": "enumeration",
      "enum": ["none", "partial", "required", "unknown"],
      "default": "unknown"
    },
    "internet_required": {
      "type": "enumeration",
      "enum": ["no", "sometimes", "yes", "unknown"],
      "default": "unknown"
    },
    "operator_required": {
      "type": "enumeration",
      "enum": ["no", "sometimes", "yes", "unknown"],
      "default": "unknown"
    },
    "notes": {
      "type": "richtext"
    }
  }
}

robot.safety — src/components/robot/safety.json
{
  "collectionName": "components_robot_safeties",
  "info": {
    "displayName": "Safety",
    "description": "Safety mechanisms and known risks"
  },
  "options": {},
  "attributes": {
    "emergency_stop": {
      "type": "enumeration",
      "enum": ["yes", "no", "unknown"],
      "default": "unknown"
    },
    "collision_detection": {
      "type": "enumeration",
      "enum": ["yes", "no", "unknown"],
      "default": "unknown"
    },
    "safe_near_children": {
      "type": "enumeration",
      "enum": ["yes", "no", "unknown"],
      "default": "unknown"
    },
    "certifications": {
      "type": "json"
    },
    "known_risks": {
      "type": "json"
    },
    "notes": {
      "type": "richtext"
    }
  }
}

robot.environment — src/components/robot/environment.json
{
  "collectionName": "components_robot_environments",
  "info": {
    "displayName": "Environment Requirements",
    "description": "Real-world constraints: space, floor, lighting, connectivity"
  },
  "options": {},
  "attributes": {
    "space_requirements": {
      "type": "text"
    },
    "lighting_constraints": {
      "type": "text"
    },
    "floor_constraints": {
      "type": "text"
    },
    "connectivity": {
      "type": "text"
    },
    "setup_requirements": {
      "type": "text"
    }
  }
}

robot.specs — src/components/robot/specs.json
{
  "collectionName": "components_robot_specs",
  "info": {
    "displayName": "Public Specs",
    "description": "Only publicly known specs; null = unknown"
  },
  "options": {},
  "attributes": {
    "height_cm": {
      "type": "decimal"
    },
    "weight_kg": {
      "type": "decimal"
    },
    "payload_kg": {
      "type": "decimal"
    },
    "runtime_min": {
      "type": "integer"
    },
    "charging_time_min": {
      "type": "integer"
    },
    "sensors_public": {
      "type": "json"
    },
    "power": {
      "type": "string"
    },
    "sdk_api": {
      "type": "enumeration",
      "enum": ["yes", "no", "unknown"],
      "default": "unknown"
    },
    "data_completeness": {
      "type": "enumeration",
      "enum": ["low", "medium", "high"],
      "default": "low"
    },
    "notes": {
      "type": "richtext"
    }
  }
}

robot.faq-item — src/components/robot/faq-item.json
{
  "collectionName": "components_robot_faq_items",
  "info": {
    "displayName": "FAQ Item",
    "description": "FAQ linked to claims (no separate evidence duplication)"
  },
  "options": {},
  "attributes": {
    "question": {
      "type": "string",
      "required": true
    },
    "answer_short": {
      "type": "text",
      "required": true
    },
    "answer_conditions": {
      "type": "text"
    },
    "answer_not_possible": {
      "type": "text"
    },
    "confidence": {
      "type": "enumeration",
      "enum": ["high", "medium", "low"],
      "default": "medium"
    },
    "claims": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::claim.claim"
    }
  }
}

robot.expert-summary — src/components/robot/expert-summary.json
{
  "collectionName": "components_robot_expert_summaries",
  "info": {
    "displayName": "Expert Summary",
    "description": "Cold, factual expert summary for consumers"
  },
  "options": {},
  "attributes": {
    "who_is_it_for": {
      "type": "text"
    },
    "who_is_it_not_for": {
      "type": "text"
    },
    "top_risks": {
      "type": "json"
    },
    "recommendation_level": {
      "type": "enumeration",
      "enum": ["watch_only", "early_adopter", "practical_consumer", "not_recommended"],
      "default": "watch_only"
    },
    "final_note": {
      "type": "text"
    }
  }
}

robot.classification — src/components/robot/classification.json
{
  "collectionName": "components_robot_classifications",
  "info": {
    "displayName": "Robot Classification",
    "description": "Canonical comparison fields for filters and comparisons (no JSON)"
  },
  "options": {},
  "attributes": {
    "locomotion_type": {
      "type": "enumeration",
      "enum": ["bipedal", "wheeled", "hybrid", "unknown"],
      "default": "unknown"
    },
    "manipulation_level": {
      "type": "enumeration",
      "enum": ["none", "basic_grasp", "dexterous", "unknown"],
      "default": "unknown"
    },
    "autonomy_level": {
      "type": "enumeration",
      "enum": ["manual", "teleop", "semi", "autonomous", "unknown"],
      "default": "unknown"
    },
    "cloud_dependency": {
      "type": "enumeration",
      "enum": ["none", "partial", "required", "unknown"],
      "default": "unknown"
    },
    "sdk_api": {
      "type": "enumeration",
      "enum": ["yes", "no", "unknown"],
      "default": "unknown"
    }
  }
}

C) CTO “SAFE-BY-DEFAULT” — WARUNKI FRONT/API (do wdrożenia po stronie Next.js)

Front pobiera wyłącznie:

review_status = approved

publishedAt != null

Przykładowy filtr (REST):

filters[review_status][$eq]=approved

filters[publishedAt][$notNull]=true

To jest krytyczne, żeby drafty nigdy nie “wyciekły”.

D) Najważniejsze ograniczenie Strapi (żeby CTO wiedział)

Strapi nie wymusi twardo:

evidence_sources ⊆ robot.sources

bo my usunęliśmy evidence z capability i przenieśliśmy prawdę do claim (tam jest evidence).
W praktyce wystarczy proces:

Robot ma sources (pakiet)

Claim ma evidence (wybierane z puli — procesowo)

Jeśli kiedyś będziesz chciał twarde walidacje: robisz custom lifecycle/validation (opcjonalne).
ETAP 1 — WALIDACJA STRUKTURY DANYCH (CTO)

Wynik: ✅ ZATWIERDZONA (z listą drobnych korekt “hardening”, bez blokowania frontu)

To jest bardzo solidne: masz claim jako źródło prawdy, evidence trzymasz w source, a capabilities/faq są warstwą prezentacji linkującą do claimów — dokładnie o to mi chodziło (brak duplikacji dowodów, brak “marketingowego rozjechania”).

Poniżej: co jest świetne, co poprawić zanim polecimy szerzej, i co jest “opcjonalne”.

✅ Co zatwierdzam bez zmian
✅ Architektura danych (skalowalna przy 20+ robotach)

robot (strona) + claim (prawda) + source (dowód) + manufacturer (encyklopedia) = poprawny model domenowy.

capability-item i faq-item jako “presentation layer” z relacją do claim → brak dublowania evidence.

classification jako canonical pola porównań (enumy) → gotowe pod filtry / porównywarki bez refactoru.

term jako komponent repeatable zamiast JSON tagów → spójność i kontrola.

✅ SEO/ISR friendly

slug jako UID, review_status + publishedAt jako twardy filtr — safe-by-default.

Dane są “płaskie” i przewidywalne dla renderowania Server Components.

⚠️ Korekty “hardening” (zalecam zrobić teraz, ale nie blokują)
1) i18n: konsekwencja pluginu

Masz robot i claim jako localized: true, manufacturer/source jako false. To ma sens.

Korekta mała, ale ważna:

Upewnij się, że manufacturer.slug jest stabilny globalnie (bo producent nie jest lokalizowany).

Na froncie: generuj linki do producenta bez zależności od locale, a roboty/claimy per locale.

✅ To jest OK w Twoim modelu.

2) Draft&Publish + review_status: doprecyzuj “źródło prawdy publikacji”

Teraz robot ma:

draftAndPublish: true

review_status enum

Zasada CTO (zostaje):

Front: review_status=approved AND publishedAt != null.

Korekta rekomendowana:

Dla spójności procesu dodaj w panelu guideline:

Draft = robocze dane

Published + needs_review = “na stronie nie ma” (bo filtr approved)

Published + approved = “na stronie jest”
To eliminuje “ale kliknąłem publish i nie widzę” jako problem w zespole.

3) JSON w komponentach — zostawiam, ale z jasną regułą

Masz JSON-y w:

intended_use.declared_applications

safety.certifications, safety.known_risks

specs.sensors_public

expert_summary.top_risks

To jest OK, bo to nie są pola do filtrowania/porównywania.

Hardening:

Ustal format JSON (prosty i stały), np. zawsze string[]:

certifications: string[]

known_risks: string[]

sensors_public: string[]

top_risks: string[]

declared_applications: string[]

I pilnujemy tego w content guidelines.

4) Claim ↔ Source relacja: dodałbym minimalny “required” procesowy

Strapi nie wymusi min. 1 evidence dla verified — rozumiem.

Zalecenie procesowe (MVP):

claim.status = verified → wymagaj min 1 evidence (manual check w checklist)

claim.maturity != prototype → min 1 evidence

To już masz w zasadach, tylko dopnij w guideline dla edytora.

✅ Jedyna rzecz, którą zmieniłbym (opcjonalnie, ale bardzo polecam)
5) Manufacturer: name i slug jako unique globalnie — OK, ale rozważ website_url jako type: "url"

W Strapi często daje się type: "string" i waliduje format, ale “url” daje lepszą kontrolę.

Nie blokuje, ale poprawia jakość danych.

🔒 Decyzja CTO: “SAFE-BY-DEFAULT” — zatwierdzam

Twoje warunki pobierania na frontendzie:

filters[review_status][$eq]=approved

filters[publishedAt][$notNull]=true

✅ Zatwierdzone i obowiązkowe.

Dodatkowo (nie prosiłeś, ale to jest ważne):

sitemap tylko dla approved+published

robots meta dla stron nieapproved: jeśli kiedykolwiek renderujesz preview → noindex

🧾 Finalny werdykt ETAPU 1

✅ ZATWIERDZONA
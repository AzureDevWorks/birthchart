# Translation Glossary — KundaliYatra

Single source of truth for terminology across `en.json`, `hi.json`,
and `ne.json`.

**Rule:** if a term appears in this document, translators use the
listed form *verbatim*. No synonyms. No “either works.” When a new
term is needed, add it here **first**, then use it.

---

## 1. Script conventions

These are the rules that cause the most drift when they are not
written down. Both Hindi and Nepali have legitimate conventions that
differ — do not try to unify them.

### 1.1 Anusvāra vs. conjunct consonants

Modern Hindi prefers the anusvāra (`ं`). Nepali, and Sanskritised
Hindi in scholarly contexts, prefer the full conjunct.

| Word | Hindi form | Nepali form |
| --- | --- | --- |
| Panchang | पंचांग | पञ्चाङ्ग |
| Chandra | चन्द्र | चन्द्र |
| Antardasha | अन्तर्दशा | अन्तर्दशा |
| Sampurna | सम्पूर्ण | सम्पूर्ण |

**Exception for this project:** the app name is `कुण्डलीयात्रा` with
the full conjunct `ण्ड` in **both** languages. Because the brand
already leans Sanskritised, the project follows the Nepali conjunct
convention for **Jyotish terms in both languages**, and the Hindi
anusvāra convention only for **everyday Hindi words** (e.g. अंत is
never used here; अन्त is).

Practical effect — in both `hi.json` and `ne.json`:

- ✅ चन्द्र — never चंद्र
- ✅ पञ्चाङ्ग — never पंचांग
- ✅ अन्तर्दशा — never अंतरदशा
- ✅ कुण्डली — never कुंडली

### 1.2 Nukta

Use the nukta where the sound requires it, and nowhere else.

- ✅ फ़ (as in फ़िल्टर)
- ✅ ज़ (as in ज़रूर) — but prefer जरूर if a word is fully Sanskritised
- ✅ क़, ख़, ग़ — only where already standard

### 1.3 Punctuation

- Use the ellipsis character `…` (U+2026), never three ASCII dots.
- Use Devanagari-friendly quotes `“ ”` for prose quotes. Keep ASCII
  `"` only inside JSON escapes and around interpolation placeholders.
- The danda `।` ends every sentence in Hindi and Nepali. Do not use
  the period `.` at sentence end.

### 1.4 Numerals

- **Devanagari digits** (`०१२३४५६७८९`) for dates, counts, and years
  inside body prose.
- **ASCII digits** for coordinates, timezone offsets, version
  numbers, and code.
- When in doubt, follow what `src/infrastructure/calendar/nepali-date.ts`
  already does — it has `toDevanagari()` for exactly this purpose.

---

## 2. Jyotish terminology

### 2.1 The three anchors

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Lagna (Ascendant) | लग्न | लग्न | Never उदय or आरोह |
| Chandra (Moon) | चन्द्र | चन्द्र | Never चंद्र, never मून |
| Surya (Sun) | सूर्य | सूर्य | Never सन, never रवि |
| Nakshatra | नक्षत्र | नक्षत्र | Never नक्षत्रम |
| Rashi (sign) | राशि | राशि | Never साइन |
| Bhava (house) | भाव | भाव | Never घर in Jyotish context |
| Graha (planet) | ग्रह | ग्रह | |
| Rashi Lord | राशि स्वामी | राशि स्वामी | Never राशि अधिपति |
| Nakshatra Lord | नक्षत्र स्वामी | नक्षत्र स्वामी | |

### 2.2 Time — dasha and panchang

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Dasha (planetary period) | दशा | दशा | |
| Mahadasha | महादशा | महादशा | |
| Antardasha | अन्तर्दशा | अन्तर्दशा | Never अंतर्दशा, never अन्तर दशा |
| Pratyantar | प्रत्यन्तर्दशा | प्रत्यन्तर्दशा | Full form preferred over प्रत्यन्तर |
| Vimshottari | विंशोत्तरी | विंशोत्तरी | Never विंशोत्तरी |
| Panchang | पञ्चाङ्ग | पञ्चाङ्ग | |
| Tithi | तिथि | तिथि | |
| Karana | करण | करण | |
| Yoga (limb) | योग | योग | Context disambiguates from Dhana Yoga |
| Vara | वार | वार | |
| Muhurta | मुहूर्त | मुहूर्त | |
| Choghadiya | चौघड़िया | चौघडिया | Hindi retroflex; Nepali uses ड not ड़ |
| Hora | होरा | होरा | |
| Rahu Kalam | राहु काल | राहु काल | Two words |
| Brahma Muhurta | ब्रह्म मुहूर्त | ब्रह्म मुहूर्त | |
| Abhijit Muhurta | अभिजित मुहूर्त | अभिजित मुहूर्त | |

### 2.3 Transits — gochar

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Gochar (transit) | गोचर | गोचर | Never ट्रांज़िट |
| Sade Sati | साढ़े साती | साढे साती | |
| Dhaiya | ढैया | ढैया | |
| Chandrashtama | चन्द्राष्टम | चन्द्राष्टम | |
| Tarabalam | ताराबल | ताराबल | |
| Disha Shoola | दिशा शूल | दिशा शूल | |
| Vedha | वेध | वेध | Never अवरोध |
| Vedha exempted | वेध मुक्त | वेध मुक्त | Not just मुक्त |
| House from Moon | चन्द्र से भाव | चन्द्रबाट भाव | |

### 2.4 Strength and structure

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Ashtakavarga | अष्टकवर्ग | अष्टकवर्ग | |
| Bindu | बिन्दु | बिन्दु | Never बिंदु |
| Chalit | चलित | चलित | |
| Bhava Chalit | भाव चलित | भाव चलित | |
| Kendra (angle) | केन्द्र | केन्द्र | |
| Trikona (trine) | त्रिकोण | त्रिकोण | |
| Dusthana | दुष्टान | दुष्टान | |
| Arudha Pada | आरूढ़ पद | आरूढ पद | |
| Varga (division) | वर्ग | वर्ग | |

### 2.5 Divisional charts

All varga names follow this pattern: `D<n>` is kept as Latin, the
name is translated.

| English | Hindi | Nepali |
| --- | --- | --- |
| Rashi (D1) | राशि | राशि |
| Navamsha (D9) | नवांश | नवांश |
| Dashamsha (D10) | दशांश | दशांश |
| Shodashamsha (D16) | षोडशांश | षोडशांश |
| Siddhamsha (D24) | सिद्धांश | सिद्धांश |
| Trimshamsha (D30) | त्रिंशांश | त्रिंशांश |
| Shashtiamsha (D60) | षष्ट्यंश | षष्ट्यंश |

### 2.6 Jaimini karakas

Always keep the Sanskrit. Never translate the meaning into the label.

| English | Hindi | Nepali |
| --- | --- | --- |
| Atmakaraka | आत्मकारक | आत्मकारक |
| Amatyakaraka | अमात्यकारक | अमात्यकारक |
| Bhratrikaraka | भ्रातृकारक | भ्रातृकारक |
| Matrikaraka | मातृकारक | मातृकारक |
| Putrakaraka | पुत्रकारक | पुत्रकारक |
| Gnatikaraka | ज्ञातिकारक | ज्ञातिकारक |
| Darakaraka | दारकारक | दारकारक |

### 2.7 Special lagnas

| English | Hindi | Nepali |
| --- | --- | --- |
| Ghatika Lagna | घटिका लग्न | घटिका लग्न |
| Hora Lagna | होरा लग्न | होरा लग्न |
| Bhava Lagna | भाव लग्न | भाव लग्न |
| Shree Lagna | श्री लग्न | श्री लग्न |
| Indu Lagna | इन्दु लग्न | इन्दु लग्न |
| Pranapada | प्राणपद | प्राणपद |

### 2.8 Matching

| English | Hindi | Nepali |
| --- | --- | --- |
| Guna Milan | गुण मिलान | गुण मिलान |
| Koota | कूट | कूट |
| Ashtakoota | अष्टकूट | अष्टकूट |
| Mangal Dosha | मंगल दोष | मङ्गल दोष |
| Kuja Dosha | कुज दोष | कुज दोष |
| Papasamyam | पापसम्यम् | पापसम्यम् |

Note: Hindi uses `मंगल`, Nepali uses `मङ्गल` (with ङ्) — this is a
real orthographic difference, not a mistake.

### 2.9 Systems

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Lal Kitab | लाल किताब | लाल किताब | |
| KP (Krishnamurti Paddhati) | केपी | केपी | Keep `KP` in Latin where the layout is tight |
| Sub-lord | उप-स्वामी | उप-स्वामी | |
| Cusp | कस्प | कस्प | Loanword accepted |
| Upaya (remedy) | उपाय | उपाय | |
| Daan (charity) | दान | दान | |
| Mantra | मन्त्र | मन्त्र | Never मंत्र |
| Japa count | जप संख्या | जप संख्या | |

### 2.10 Life-area terms

| English | Hindi | Nepali |
| --- | --- | --- |
| Dharma | धर्म | धर्म |
| Artha | अर्थ | अर्थ |
| Kama | काम | काम |
| Moksha | मोक्ष | मोक्ष |
| Career / Vocation | करियर | करियर |
| Wealth | धन | धन |
| Health | स्वास्थ्य | स्वास्थ्य |
| Relationships | सम्बन्ध | सम्बन्ध |
| Education | शिक्षा | शिक्षा |
| Family | परिवार | परिवार |
| Spiritual | आध्यात्मिक | आध्यात्मिक |
| Karma | कर्म | कर्म |

---

## 3. UI / functional vocabulary

### 3.1 Navigation

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Home | मुख्य | गृहपृष्ठ | **Never** घर in either |
| Chart | कुण्डली | कुण्डली | |
| Panchang | पञ्चाङ्ग | पञ्चाङ्ग | |
| Gochar | गोचर | गोचर | |
| Predictions | फलादेश | फलादेश | Never भविष्यवाणी |
| Matching | मिलान | मिलान | |
| Profiles | प्रोफ़ाइल | प्रोफाइल | |
| Reading | फलादेश | फलादेश | Not पठन — see §5 |
| Analysis | विश्लेषण | विश्लेषण | Never जाँच in headings |

### 3.2 Actions

| English | Hindi | Nepali |
| --- | --- | --- |
| Change | बदलें | परिवर्तन |
| Reset | रीसेट | रिसेट |
| Regenerate | पुनः बनाएँ | पुनः बनाउनुहोस् |
| Clear | साफ़ करें | खाली गर्नुहोस् |
| Delete | हटाएँ | हटाउनुहोस् |
| Save | सहेजें | बचत गर्नुहोस् |
| Cancel | रद्द करें | रद्द गर्नुहोस् |
| Confirm | पुष्टि करें | पुष्टि गर्नुहोस् |
| Back | वापस | फर्कनुहोस् |
| Next | अगला | अर्को |
| Previous | पिछला | अघिल्लो |
| Continue | जारी रखें | जारी राख्नुहोस् |
| Calculate | गणना करें | गणना गर्नुहोस् |
| Match | मिलान करें | मिलान गर्नुहोस् |

### 3.3 States

| English | Hindi | Nepali |
| --- | --- | --- |
| Loading | लोड हो रहा है… | लोड हुँदैछ… |
| Searching | खोज रहे हैं… | खोज्दै… |
| Calculating | गणना हो रही है… | गणना हुँदैछ… |
| Active | सक्रिय | सक्रिय |
| Inactive | निष्क्रिय | निष्क्रिय |
| Favorable | अनुकूल | अनुकूल |
| Unfavorable | प्रतिकूल | प्रतिकूल |
| Auspicious | शुभ | शुभ |
| Inauspicious | अशुभ | अशुभ |
| Available | उपलब्ध | उपलब्ध |
| Unavailable | अनुपलब्ध | उपलब्ध छैन |

### 3.4 Settings and system

| English | Hindi | Nepali | Notes |
| --- | --- | --- | --- |
| Settings | सेटिंग्स | सेटिङ | Hindi long form, Nepali short |
| Language | भाषा | भाषा | |
| Palette (color) | रंग योजना | रङ योजना | Never रंग पटल, never प्यालेट |
| Theme | थीम | थिम | Loanword accepted |
| Light | हल्का | उज्यालो | |
| Dark | गहरा | अँध्यारो | |
| System | सिस्टम | सिस्टम | |
| Profile | प्रोफ़ाइल | प्रोफाइल | |
| Export | निर्यात | निर्यात | |
| Import | आयात | आयात | |
| Print | प्रिंट करें | प्रिन्ट गर्नुहोस् | |
| Download | डाउनलोड | डाउनलोड | |
| Copy | प्रतिलिपि करें | प्रतिलिपि गर्नुहोस् | |

### 3.5 Personal-information vocabulary

| English | Hindi | Nepali |
| --- | --- | --- |
| Name | नाम | नाम |
| Birth Date | जन्म तिथि | जन्म मिति |
| Birth Time | जन्म समय | जन्म समय |
| Birth Place | जन्म स्थान | जन्म स्थान |
| Birth City | जन्म नगर | जन्म सहर |
| City | नगर | सहर |
| Country | देश | देश |
| Timezone | समयक्षेत्र | समयक्षेत्र |
| Current Location | वर्तमान स्थान | वर्तमान स्थान |

---

## 4. Do-not-translate list

These are always Latin script, in every locale. They are proper names,
technical identifiers, or abbreviations that every reader recognises
in Latin.

- `KundaliYatra` (the brand, in body text — the app name field may
  use `कुण्डलीयात्रा`, but body references stay Latin)
- `D1`, `D2`, `D9`, `D10`, `D60` — all varga codes
- `API`, `API Key`, `PDF`, `JSON`, `AI`, `URL`
- `KP` when used as a system abbreviation
- `Om` (as Latin transliteration) — but `ॐ` (the Devanagari ligature)
  is preferred in prose
- Provider names: `Gemini`, `Groq`, `Mistral`, `OpenRouter`,
  `DeepSeek`, `Anthropic`, `OpenAI`, `1min.ai`

---

## 5. Decision log

Terms where a choice was made and should not be revisited without a
good reason.

### 5.1 फलादेश over पठन for "Reading"

`फलादेश` (phalādeśa) literally means "declaration of results" — the
classical term for a chart reading. `पठन` (paṭhan) means "reading" in
the sense of reciting a text.

For a Jyotish app the first is correct. `पठन` reads like a student
reading a book aloud.

### 5.2 भाव over घर for "house"

`घर` is the everyday word for "house (building)". In Jyotish, the
technical term is always `भाव`. Never use `घर` in a chart context.

### 5.3 `वेध मुक्त` not `मुक्त`

`मुक्त` on its own means "free / liberated" — a reader sees that and
thinks "spiritually free," not "the vedha obstruction has been
cancelled." Always pair with the technical term: `वेध मुक्त`.

### 5.4 `चन्द्र` not `चंद्र` in both languages

Even Hindi, which normally prefers anusvāra, uses the conjunct here
because this is a Jyotish app and every reference text spells it with
`न्द`. Keep consistent.

### 5.5 `रंग योजना` over `रंग पटल`

`पटल` means "board / plaque / panel" — it describes the physical
control, not the choice. `योजना` means "scheme / arrangement,"
which is what "palette" actually refers to in a design sense.

---

## 6. Adding a new term

When a new English string needs translating, do this in order:

1. Check whether the term is already in this file. If yes, use it.
2. If it is a Jyotish term, look it up in a classical text (`Brihat
   Parashara Hora Shastra`, `Muhurta Chintamani`, etc.) and use the
   form that appears there. Do not invent.
3. If it is a UI term, check how existing similar terms in §3 are
   translated and follow the same register.
4. Add the term to this file **before** committing the JSON change.
   The JSON is downstream of this file.

---

## 7. Guardrail

Section 5.5 of the JSON conventions is enforced automatically. To
check for banned forms in a locale file:

```sh
# From the project root
grep -nE 'कुंडली|चंद्र|अंतर्दशा|रंग पटल|लोड हो रहा है\.\.\.|खोज रहे हैं\.\.\.' \
  src/i18n/locales/hi.json
grep -nE 'कुंडली|चंद्र|अंतर्दशा|रंग प्यालेट|लोड हुँदैछ\.\.\.|खोज्दै\.\.\.' \
  src/i18n/locales/ne.json
```

Both should return nothing. If either returns a line, that key is out
of spec — fix it before merging.

A future improvement would be to run this from a pre-commit hook or a
`npm run lint:i18n` script, backed by the banned-form list in this
section.

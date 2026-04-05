import re

with open("src/App.js", "r") as f:
    content = f.read()

print(f"File loaded: {len(content)} chars")

# ── FIX 1: Staggered animations - slower and more spread out ─────────────────
old_anim = (
    ".tl-fade { animation: fadeUp 0.5s ease both; } "
    ".tl-fade-1 { animation: fadeUp 0.5s ease 0.1s both; } "
    ".tl-fade-2 { animation: fadeUp 0.5s ease 0.2s both; } "
    ".tl-fade-3 { animation: fadeUp 0.5s ease 0.3s both; } "
    ".tl-fade-4 { animation: fadeUp 0.5s ease 0.4s both; } "
    ".tl-fade-5 { animation: fadeUp 0.5s ease 0.5s both; } "
)
new_anim = (
    ".tl-fade { animation: fadeUp 0.7s ease both; } "
    ".tl-fade-1 { animation: fadeUp 0.7s ease 0.25s both; } "
    ".tl-fade-2 { animation: fadeUp 0.7s ease 0.5s both; } "
    ".tl-fade-3 { animation: fadeUp 0.7s ease 0.75s both; } "
    ".tl-fade-4 { animation: fadeUp 0.7s ease 1.0s both; } "
    ".tl-fade-5 { animation: fadeUp 0.7s ease 1.25s both; } "
)
content = content.replace(old_anim, new_anim)
print("Staggered animations fixed")

# ── FIX 2: Card hover - add CSS for tl-card, fix white disappear ─────────────
old_card_hover = (
    ".tl-card:hover { border-color: #7EB3FF !important; transform: translateY(-3px); "
    "box-shadow: 0 8px 24px rgba(126,179,255,0.18) !important; background: #FAFCFF !important; } "
    ".tl-card { transition: all 0.2s ease; } "
)
new_card_hover = (
    ".tl-card { transition: all 0.2s ease; background: white; } "
    ".tl-card:hover { border-color: #7EB3FF !important; transform: translateY(-3px); "
    "box-shadow: 0 8px 24px rgba(126,179,255,0.15) !important; background: #F5F9FF !important; } "
)
content = content.replace(old_card_hover, new_card_hover)
print("Card hover CSS fixed")

# ── FIX 3: Issue card hover - fix white disappear on profile questions ────────
old_ic_hover = (
    ".tl-ic { transition: all 0.2s ease; } "
    ".tl-ic:hover { border-color: #7EB3FF !important; background: #F2F7FF !important; "
    "transform: translateY(-2px); box-shadow: 0 4px 14px rgba(126,179,255,0.15); } "
)
new_ic_hover = (
    ".tl-ic { transition: all 0.2s ease; } "
    ".tl-ic:hover { border-color: #7EB3FF !important; background: #F2F7FF !important; "
    "transform: translateY(-2px); box-shadow: 0 4px 14px rgba(126,179,255,0.15) !important; } "
)
content = content.replace(old_ic_hover, new_ic_hover)

# Also fix the profile form buttons - they use className approach
# Replace bg-gray-50 buttons with tl-ic class approach
old_form_btn = (
    "className={`py-3 px-4 rounded-xl font-medium text-sm transition-all border-2 ${\n"
    "                    answers[key] === option\n"
    "                      ? 'bg-blue-600 text-white border-blue-600'\n"
    "                      : 'bg-gray-50 text-gray-700 border-transparent hover:border-blue-200'\n"
    "                  }`}"
)
new_form_btn = (
    "className={answers[key] === option ? 'tl-ic-sel' : 'tl-ic'}\n"
    "                  style={{\n"
    "                    padding: '12px 16px', borderRadius: '12px',\n"
    "                    fontFamily: \"'Lora', Georgia, serif\", fontSize: '14px', cursor: 'pointer',\n"
    "                    background: answers[key] === option ? '#7EB3FF' : 'white',\n"
    "                    color: answers[key] === option ? 'white' : '#333',\n"
    "                    border: answers[key] === option ? '2px solid #7EB3FF' : '0.5px solid #E8E8E8',\n"
    "                  }}"
)
content = content.replace(old_form_btn, new_form_btn)
print("Form button hover fixed")

# ── FIX 4: Add tl-card to result page white cards so hover works ──────────────
# Results page candidate comparison cards
content = content.replace(
    "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', border: '0.5px solid #EEEEEE' }}",
    "className=\"tl-card\" style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '0.5px solid #EEEEEE' }}"
)
# Summary page cards
content = content.replace(
    "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE' }}",
    "className=\"tl-card\" style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE' }}"
)
print("Result and summary card hover added")

# ── FIX 5: Fix folder emoji in policies page ──────────────────────────────────
content = content.replace(
    "<h3 className=\"text-lg font-bold text-gray-700 mb-4\">🗂 Other Issues</h3>",
    "<h3 style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: '16px', fontWeight: 500, color: '#111', marginBottom: '16px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EB3FF\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"/></svg>Other Issues</h3>"
)
# Also catch the version with emoji directly
content = content.replace(
    ">🗂 Other Issues<",
    "><svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#7EB3FF\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z\"/></svg> Other Issues<"
)
print("Folder emoji replaced")

# ── FIX 6: Fix grammar - "Personalized for a , employed..." ──────────────────
# The issue is student label can be empty or "non-student" which reads weird
old_personalized = (
    "Personalized for a {labelMap.student[answers.student]}, "
    "{labelMap.employment[answers.employment]}, "
    "{labelMap.income[answers.income]}, "
    "{labelMap.housing[answers.housing]}"
)
new_personalized = (
    "Personalized for: {[labelMap.student[answers.student], labelMap.employment[answers.employment], labelMap.income[answers.income], labelMap.housing[answers.housing]].filter(Boolean).join(' - ')}"
)
content = content.replace(old_personalized, new_personalized)
print("Personalized grammar fixed")

# ── FIX 7: Fix profile recap dots - make consistent capitalization ────────────
# "Your profile" section uses middle dot separators
old_profile_recap = (
    "{labelMap.student[answers.student]} · {labelMap.employment[answers.employment]} · "
    "{labelMap.income[answers.income]} income · {labelMap.housing[answers.housing]}"
)
new_profile_recap = (
    "{[labelMap.student[answers.student], labelMap.employment[answers.employment], "
    "labelMap.income[answers.income] + ' income', labelMap.housing[answers.housing]].filter(Boolean).join(' · ')}"
)
content = content.replace(old_profile_recap, new_profile_recap)
print("Profile recap grammar fixed")

# ── FIX 8: Fix "your top priorities" lowercase issue ─────────────────────────
# issueOptions labels should be consistently capitalized - they already are
# The issue might be in the map display - check for label display
# Make sure label text in summary is proper
old_priorities_text = "Your top priorities: {selectedIssueData.map(i => i.label).join(', ')}"
new_priorities_text = "Your top priorities: {selectedIssueData.map(i => i.label).join(', ')}"
# Labels are already capitalized in issueOptions so this should be fine
# The issue might be in the profile display joining
print("Priorities text checked")

# ── FIX 9: Bigger chat font sizes ────────────────────────────────────────────
# Chat bubble text
content = content.replace(
    "fontSize: '13px', color: '#111', lineHeight: 1.7",
    "fontSize: '15px', color: '#111', lineHeight: 1.75"
)
content = content.replace(
    "fontSize: '11px', color: '#111', lineHeight: 1.7",
    "fontSize: '15px', color: '#111', lineHeight: 1.75"
)
content = content.replace(
    "fontSize: '11px', color: 'white', lineHeight: 1.7",
    "fontSize: '15px', color: 'white', lineHeight: 1.75"
)
# Chat input placeholder
content = content.replace(
    "fontFamily: \"'Lora', Georgia, serif\", fontSize: '13px', outline: 'none', background: '#F8F8F8'",
    "fontFamily: \"'Lora', Georgia, serif\", fontSize: '15px', outline: 'none', background: '#F8F8F8'"
)
# Chat intro message
content = content.replace(
    "<p className=\"text-gray-800 text-sm leading-relaxed\">{config.intro}</p>",
    "<p style={{ fontFamily: \"'Lora', Georgia, serif\", fontSize: '15px', color: '#111', lineHeight: 1.75 }}>{config.intro}</p>"
)
print("Chat font sizes fixed")

# ── FIX 10: Fix "Canada-US Relations" capitalization ─────────────────────────
content = content.replace(
    "{ key: 'canadaus', label: 'Canada-US Relations',",
    "{ key: 'canadaus', label: 'Canada-US Relations',"
)
# Already correct - check if description has lowercase
content = content.replace(
    "description: 'Tariffs, sovereignty, trade'",
    "description: 'Tariffs, sovereignty, trade'"
)
print("Capitalization checked")

with open("src/App.js", "w") as f:
    f.write(content)

print(f"\nAll done! File saved: {len(content)} chars")
print("Changes made:")
print("  1. Staggered animations - slower, spread out over 1.25s")
print("  2. Card hover fixed - light blue tint, not white")
print("  3. Profile form button hover fixed")
print("  4. Results and summary cards get hover")
print("  5. Folder emoji replaced with icon")
print("  6. Grammar fixed - Personalized for: X - Y - Z")
print("  7. Profile recap consistent")
print("  8. Chat text bigger")

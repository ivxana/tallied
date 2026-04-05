import re

with open("src/App.js", "r") as f:
    content = f.read()

original = content

# FIX 1: Logo - replace whatever TalliedLogo exists with the correct checkmark one
logo_pattern = re.compile(r'const TalliedLogo = \(\{ size = \d+ \}\) => \([\s\S]+?\);\n', re.MULTILINE)
new_logo = (
    "const TalliedLogo = ({ size = 28 }) => (\n"
    "  <svg width={size} height={size} viewBox=\"0 0 56 56\" fill=\"none\">\n"
    "    <rect x=\"4\" y=\"10\" width=\"38\" height=\"38\" rx=\"5\" fill=\"#7EB3FF\"/>\n"
    "    <polyline points=\"12,29 21,38 28,31\" stroke=\"#4A7AE0\" strokeWidth=\"4\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/>\n"
    "    <polyline points=\"21,38 48,8\" stroke=\"#C0395A\" strokeWidth=\"4\" strokeLinecap=\"round\" strokeLinejoin=\"round\"/>\n"
    "  </svg>\n"
    ");\n"
)
new_content = logo_pattern.sub(new_logo, content)
if new_content != content:
    content = new_content
    print("Logo fixed")
else:
    print("Logo pattern not found - may already be correct")

# FIX 2: Blue color - lighten from #6B9FFF to #7EB3FF
content = content.replace("#6B9FFF", "#7EB3FF")
content = content.replace("#3A6FD8", "#2D6FD4")
print("Blue colors updated")

# FIX 3: Bigger font sizes - body text
content = content.replace("fontSize: '13px', color: '#333', lineHeight: 1.7", "fontSize: '15px', color: '#333', lineHeight: 1.75")
content = content.replace("fontSize: '13px', color: '#333', lineHeight: 1.6", "fontSize: '15px', color: '#333', lineHeight: 1.75")
content = content.replace("fontSize: '11px', color: '#333', lineHeight: 1.7", "fontSize: '14px', color: '#333', lineHeight: 1.75")
content = content.replace("fontSize: '12px', color: '#333', lineHeight: 1.6", "fontSize: '14px', color: '#333', lineHeight: 1.7")
content = content.replace("fontSize: '12px', color: '#333', lineHeight: 1.7", "fontSize: '14px', color: '#333', lineHeight: 1.7")
content = content.replace("fontSize: '13px', color: '#222', lineHeight: 1.7", "fontSize: '15px', color: '#222', lineHeight: 1.75")
content = content.replace("fontSize: '11px', color: '#222', lineHeight: 1.7", "fontSize: '14px', color: '#222', lineHeight: 1.75")
content = content.replace("fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: 1.6", "fontSize: '15px', color: '#555', marginBottom: '20px', lineHeight: 1.7")
content = content.replace("fontSize: '13px', color: '#555', marginBottom: '16px', lineHeight: 1.6", "fontSize: '15px', color: '#555', marginBottom: '16px', lineHeight: 1.7")
content = content.replace("fontSize: '13px', color: '#333', marginBottom: '6px', lineHeight: 1.6", "fontSize: '15px', color: '#333', marginBottom: '6px', lineHeight: 1.7")
content = content.replace("fontSize: '13px', color: '#333'", "fontSize: '15px', color: '#333'")
content = content.replace("fontSize: '13px', color: '#555'", "fontSize: '15px', color: '#555'")
content = content.replace("fontSize: '11px', color: '#333'", "fontSize: '14px', color: '#333'")
content = content.replace("fontSize: '12px', color: '#888'", "fontSize: '13px', color: '#888'")
content = content.replace("fontSize: '12px', color: '#333'", "fontSize: '14px', color: '#333'")
print("Font sizes updated")

# FIX 4: Max width wider for desktop
content = content.replace("maxWidth: '560px'", "maxWidth: '700px'")
content = content.replace("maxWidth: '672px'", "maxWidth: '840px'")
content = content.replace("max-w-2xl mx-auto", "max-w-4xl mx-auto")
print("Max width updated")

# FIX 5: Policy card hover effect
old_pc = "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE', overflow: 'hidden' }}"
new_pc = "style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', border: '0.5px solid #EEEEEE', overflow: 'hidden', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.currentTarget.style.borderColor='#7EB3FF'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 6px 20px rgba(126,179,255,0.18)'; e.currentTarget.style.background='#FAFCFF'; }} onMouseLeave={e => { e.currentTarget.style.borderColor='#EEEEEE'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='white'; }}"
content = content.replace(old_pc, new_pc)
print("Card hover done")

# FIX 6: Inject CSS animations
old_effect = "  React.useEffect(() => {\n    const link = document.createElement('link');"
new_effect = (
    "  React.useEffect(() => {\n"
    "    const style = document.createElement('style');\n"
    "    style.textContent = '@keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } } .tl-fade { animation: fadeUp 0.5s ease both; } .tl-fade-1 { animation: fadeUp 0.5s ease 0.1s both; } .tl-fade-2 { animation: fadeUp 0.5s ease 0.2s both; } .tl-fade-3 { animation: fadeUp 0.5s ease 0.3s both; } .tl-fade-4 { animation: fadeUp 0.5s ease 0.4s both; }';\n"
    "    document.head.appendChild(style);\n"
    "    const link = document.createElement('link');"
)
content = content.replace(old_effect, new_effect)
print("Animations injected")

with open("src/App.js", "w") as f:
    f.write(content)
print("\nAll done - src/App.js saved")
print(f"File size: {len(content)} chars")

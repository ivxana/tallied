with open("src/App.js", "r") as f:
    c = f.read()

orig = c

# FIX 1: PolicyCard hover - replace the exact className string
old = 'className="bg-white rounded-2xl shadow-sm p-6 mb-5">'
new = ('className="bg-white rounded-2xl p-6 mb-5"'
       ' style={{border:"0.5px solid #EEEEEE",transition:"all 0.2s ease"}}'
       ' onMouseEnter={e=>{'
       'e.currentTarget.style.border="1.5px solid #7EB3FF";'
       'e.currentTarget.style.transform="translateY(-3px)";'
       'e.currentTarget.style.boxShadow="0 8px 24px rgba(126,179,255,0.15)";'
       'e.currentTarget.style.background="#F5F9FF";'
       '}}'
       ' onMouseLeave={e=>{'
       'e.currentTarget.style.border="0.5px solid #EEEEEE";'
       'e.currentTarget.style.transform="";'
       'e.currentTarget.style.boxShadow="";'
       'e.currentTarget.style.background="white";'
       '}}>')
count = c.count(old)
c = c.replace(old, new)
print(f"PolicyCard hover: {count} replaced")

# FIX 2: Chat bubble font size - text-sm -> bigger
old2 = 'className={`text-sm leading-relaxed ${msg.role === \'user\' ? \'text-white\' : \'text-gray-800\'}`}'
new2 = 'style={{fontFamily:"\'Lora\',Georgia,serif",fontSize:"15px",lineHeight:1.75,color:msg.role===\'user\'?"white":"#111"}}'
count2 = c.count(old2)
c = c.replace(old2, new2)
print(f"Chat bubble font: {count2} replaced")

# FIX 3: Chat input font size
old3 = 'className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400"'
new3 = 'className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" style={{fontSize:"15px",fontFamily:"\'Lora\',Georgia,serif"}}'
count3 = c.count(old3)
c = c.replace(old3, new3)
print(f"Chat input font: {count3} replaced")

# FIX 4: Calendar emoji -> icon
old4 = '<span className="text-xl">📅</span>'
new4 = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7EB3FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>'
count4 = c.count(old4)
c = c.replace(old4, new4)
print(f"Calendar emoji: {count4} replaced")

# FIX 5: Search emoji in heading
old5 = '<h3 className="text-lg font-bold text-gray-700 mb-4">🔍 Search Results</h3>'
new5 = '<h3 className="text-lg font-bold text-gray-700 mb-4">Search Results</h3>'
c = c.replace(old5, new5)

# FIX 6: Mode switcher active bg color missing
old6 = "? 'text-white border-transparent'\n                    : 'bg-gray-50 text-gray-600 border-transparent hover:border-blue-200'"
new6 = "? 'text-white border-transparent'\n                    : 'bg-gray-50 text-gray-600 border-transparent hover:border-blue-200'"
# The active button has no background - fix inline
old6b = "mode === key\n                    ? 'text-white border-transparent'"
new6b = "mode === key\n                    ? 'text-white border-transparent bg-blue-500'"
c = c.replace(old6b, new6b)
print(f"Mode switcher bg: fixed")

# FIX 7: Bottom mode switcher same issue
old7 = "mode === key\n                    ? 'text-white border-transparent'\n                    : 'bg-gray-50 text-gray-600 border-transparent hover:border-blue-200'"
new7 = "mode === key\n                    ? 'bg-blue-500 text-white border-transparent'\n                    : 'bg-gray-50 text-gray-600 border-transparent hover:border-blue-200'"
c = c.replace(old7, new7)

with open("src/App.js", "w") as f:
    f.write(c)

changed = sum(1 for a,b in zip(orig,c) if a!=b)
print(f"Total chars changed: {changed}")
print(f"File size: {len(c)}")

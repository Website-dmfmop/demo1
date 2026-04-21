import re

files = [
    r'd:\Duplicate-Website\src\pages\Admin.jsx',
]

API_CONST = "const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';\n"

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add API_URL constant after the recharts import block
    old_line = "} from 'recharts';\n\nconst Admin"
    new_line = "} from 'recharts';\n\n" + API_CONST + "\nconst Admin"
    if API_CONST not in content:
        content = content.replace(old_line, new_line)
        print(f"Added API_URL const to {path}")

    # Replace 'http://localhost:5000/...' (single or backtick quoted) with template literals
    # Pattern: fetch('http://localhost:5000/api/...')
    content = re.sub(
        r"fetch\(['\`]http://localhost:5000(/[^'\`]*)['\`]\)",
        lambda m: "fetch(`${API_URL}" + m.group(1) + "`)",
        content
    )
    # Any remaining bare http://localhost:5000 references (e.g. in template literals)
    content = content.replace("http://localhost:5000", "${API_URL}")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Done: {path}")

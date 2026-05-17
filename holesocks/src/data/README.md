# Data Directory

Static JSON data files for the HoleSocks catalogue.

## Files

- **products.json** - Product catalogue with all HoleSocks items (id, name, tagline, description, level, color, style, sizes, gaugeValue, imageUrl)
- **reviews.json** - Customer reviews data (id, productId, author, rating, comment)

## Format

- All IDs use kebab-case (e.g., "le-philosophe")
- Products indexed by id for SSG static param generation
- Reviews indexed by productId for filtering

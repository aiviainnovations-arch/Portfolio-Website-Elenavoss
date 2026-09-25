# Media Credits

This is an AIVA portfolio **concept** build. Elena Voss is a fictional
photographer; the site mixes real, freely-licensed photography with
original abstract placeholder plates and film loops — see below.

## Real photography (Unsplash License — free to use, no attribution required, credited here as good practice)

Hotlinked directly from Unsplash's CDN (`images.unsplash.com`) rather
than downloaded, per the "prefer downloading, otherwise hotlink with
credit" direction in the project brief — Unsplash's CDN is designed for
this and the license permits it. Each was individually verified as
"Free to use under the Unsplash License" (not the paid Unsplash+ tier).

| Photographer | Unsplash photo | Used for |
|---|---|---|
| maxime caron | photo-1495466587376-02676cbc8dab | Hero portrait · Still/Moving gallery + Raw Beauty gallery · "Silent Motion" film poster · "On Light" journal thumbnail |
| Branislav Rodman | photo-1718964312482-738b15e4e3b8 | About portrait · Raw Beauty cover · Quiet Forms + Earth & Silk gallery · "Form / Body" film poster · "Texture" journal thumbnail |
| Andriyko Podilnyk | photo-1571816119607-57e48af1caa9 | Quiet Forms cover · Earth & Silk + Still/Moving + Raw Beauty + Space Between gallery · "In Between" journal thumbnail |
| Annie Spratt | photo-1629467201279-707e3f68b237 | Earth & Silk cover · Space Between gallery · "Afternoon Light" film poster |
| Maxim Scheglov | photo-1733383449188-6313b38b80af | After Light cover |
| Duncan Shaffer | photo-1658089306138-cb1a3384b8a8 | After Light gallery (rooftop) |
| Ivan Henwood | photo-1761145189100-17c733d1c868 | After Light gallery (stairwell) |
| Andi Rieger | photo-1520463007424-eb27f7c02b24 | Space Between cover · "Slow Days" film poster |

None of these depict a real, named public figure being presented as
themselves — general stock photography of unidentified models/places,
standing in for a fictional photographer's own work.

## Placeholder media (procedurally generated, not real photography)

A handful of gallery "texture"/abstract inserts in `/public/images`, and
**every video file** in `/public/videos`, are still generated locally
with FFmpeg (gradient fields + grain + vignette, graded to the brand
palette). They're original and license-free but deliberately abstract —
no equivalent free, hotlinkable stock *video* could be reliably sourced
in this build's sandboxed environment (no network access to license or
download footage). Film cards therefore show a real photo as their
static thumbnail and only reveal the placeholder clip on click/play —
see the root README's "A note on how this build was produced".

## Replacing any of this

Swap a `coverImage` / `image` / `src` / `poster` value in `src/data/*.ts`
(or the direct references in `Hero.tsx` / `About.tsx`) for your own
licensed photo or video and log it in the table above. See README.md
§6–7 for the full walkthrough.

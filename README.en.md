# Colei! 2026 World Cup sticker album

[Português](README.md) | English

A digital, interactive sticker album for the 2026 FIFA World Cup (United States, Mexico and Canada).

Final Project for the course Desenvolvimento de Interfaces (Interface Development), CEUB, 2nd semester of 2026, taught by Prof. Dr. Felipe Batista da Silva. Student: Vitor Zago Pontes Morais.

Academic project, non-commercial, with no ties to FIFA, Panini or the national federations.

## How to open

Nothing to install. Open the `index.html` file in the browser (double-click).

Live site: https://vitorzago1.github.io/album-copa-2026/

Code and version history: https://github.com/vitorzago1/album-copa-2026

The site itself is in Portuguese. Button and page names below are kept in Portuguese, with the English meaning in parentheses.

### Quick test (demo mode)

The album gives one free pack per day. To avoid depending on that during the presentation:

1. Open the **Sobre** (About) page and click **Ganhar 5 pacotinhos extras** (Get 5 extra packs).
2. Go to **Pacotinhos** (Packs), tear the pack open and flip the stickers.
3. Go to **Álbum** (Album) and stick them in: drag the sticker onto its slot, or use the **Colar** (Stick) button.
4. To start over, go back to **Sobre** and click **Zerar álbum** (Reset album).

Progress is saved only in the browser where the site was opened (there is no server).

## Folder structure

```
album-copa-2026/
├── index.html, album.html, pacotinhos.html, trocas.html, login.html, contato.html, sobre.html
├── css/      styles (colors, base, components, pages, accessibility and scenes)
├── js/       behavior, one file per subject:
│             dados.js (teams and stickers), estado.js (saved progress),
│             figurinha.js (drawing and flipping), album.js, pacotinho.js, trocas.js,
│             inicio.js, carrossel.js, login.js, contato.js, formulario.js,
│             sobre.js, demonstracao.js, menu.js, tema-acessibilidade.js,
│             efeitos.js (halftone that lights up and holographic legendary),
│             cenas.js (scene engine), cenas-inicio.js (the six scenes and the sentence that lights up),
│             pacote3d.js (the 3D pack), pacotinho-3d.js (the pack live)
│             and vendor/three.min.js (the only library on the site)
├── assets/   flags, stadium photos, pack frames, background collage, SVG and fonts
├── docs/     colors, decisions, references, screenshots and code appendix
├── scripts/  support tools (contrast, page background, code appendix, frame generator)
├── README.md       (Portuguese)
├── README.en.md    (English)
└── CHANGELOG.md
```

## Step-by-step construction

Each stage below matches a version marked in git (a "tag", which works like a bookmark in the history).

### Stage 1: choosing the visual direction

- 3 visual directions were explored, each with a concept, a palette for both themes, a font pairing and a sketch of the home page.
- Chosen: **Uma tinta só** (One ink only). The page is printed on pink paper with a single blue ink, and real color only arrives through the stickers that are stuck in.
- Site name: **Colei!** (roughly "Got it, stuck it in!")

### Stage 2: structure (version `v0.1-estrutura`)

- Project folder created and git started (the version history).
- The 7 pages created in semantic HTML (`header`, `nav`, `main`, `footer`), all with the same header and footer.
- Every page has a "Pular para o conteúdo" (Skip to content) link, which helps keyboard-only users.
- The header and footer are repeated in the 7 files on purpose: with no build tool, this is the simplest way and the easiest to explain.

### Stage 3: design system (version `v0.2-design`)

A "design system" is the set of rules and pieces that gives the whole site the same look: colors, type, spacing, buttons, cards.

1. **Named colors (`css/tokens.css`).** Each color is named after its role (`--cor-fundo`, `--cor-texto`, `--cor-acao`...). There are 4 sets: light theme, dark theme and the two high-contrast versions.
2. **Calculated contrast (`scripts/contraste.js`).** The script reads `tokens.css`, calculates the contrast of every color pair in use and writes `docs/cores.md`. Result: 128 pairs, 0 failures.
3. **Fonts inside the project (`assets/fontes/`).** Londrina Solid for headings and numbers, Atkinson Hyperlegible Next for reading. They live in the project so the site works offline.
4. **General styles (`css/base.css`).** Text, links always underlined, two-tone keyboard focus, header, footer and the "double page" grid.
5. **Components (`css/componentes.css`).** Button, tag, card, coupon, slot, sticker (common, shiny and legendary), group strip, numbered steps and form field.
6. **Accessibility panel (`js/tema-acessibilidade.js` and `css/acessibilidade.css`).** Theme (light, dark or automatic), text size (3 levels), high contrast, reduce animations, more text spacing and highlight links. Everything is saved in the browser and applied before the page appears.
7. **Mobile menu (`js/menu.js`).** On small screens the menu sits behind the "Menu" button.
8. **Home page (`index.html`)** built with these pieces, plus a **style guide** on the About page, with all the pieces together.

### Stage 4: researching the data for one group

- Group C researched (Brazil, Morocco, Haiti and Scotland): 4 teams and 24 stickers (the flag and 5 players per team).
- Everything lives in `js/dados.js`, and every record has a `fonte` (source) field. Shirt number, position and club were checked against two independent lists.
- Whatever could not be confirmed is written as "a confirmar" (to be confirmed): what Brazil and Morocco did after the group stage.
- Album rules: 24 stickers per group, numbered in sequence (Group C goes from 49 to 72); legendary is the number 10, shiny is the flag and the captain, common are the rest.

### Stage 5: the album end to end with one group (version `v0.3-album`)

1. **Saved progress (`js/estado.js`).** Each person's album lives in the browser's `localStorage`, under a key with the name of whoever logged in (`colei.album.visitante` while nobody has). It stores how many copies of each sticker came out, which ones were stuck in, the extra packs, the streak of days and the achievements.
2. **A sticker that flips (`js/figurinha.js`).** The sticker is a `<button>`: click, Enter or Space flip it. The front has the portrait, the name, the team, the rarity and the number; the back has position, club and a fun fact. The turn is done in CSS and, with "Reduzir animações" (Reduce animations), the face is simply swapped.
3. **Album page (`album.html` and `js/album.js`).** Each team is a double page: the team sheet on one side and six numbered slots on the other. A slot shows the sticker stuck in, the empty slot with the "Colar" (Stick) button (when the sticker is in hand) or the empty slot with "Falta" (Missing).
4. **Two ways to stick.** Dragging the sticker from the "Na mão" (In hand) tray onto the slot with its number, or with the "Colar" button (on the tray and on the slot itself). The button exists because not everyone can drag.
5. **Undo.** After sticking, a message appears at the bottom of the screen with a "Desfazer" (Undo) button, and the same button shows under the sticker that was just stuck. The message does not disappear on its own: it stays until the next action or until it is closed.
6. **Search, tabs and filters.** Search by name, number, team, position or club (accent-insensitive); tabs Todas, Tenho, Faltam and Repetidas (All, Have, Missing, Duplicates), following the WAI-ARIA pattern (arrows, Home and End); filters for group, team, position and rarity. The number of results is announced to screen readers.
7. **Pack of the day (`pacotinhos.html` and `js/pacotinho.js`).** One free pack per day, with 5 different stickers. The draw works like a ballot box: each common enters with 6 tickets, each shiny with 3 and each legendary with 1. The stickers come out face down and are flipped one by one (or all at once). New ones can be stuck in right from there.
8. **Duplicates, streak and achievements.** Each sticker has a duplicate counter. The card marks the consecutive days a pack was opened. There are 6 achievements, and each one is worth an extra pack.
9. **Home page with real progress (`js/inicio.js`).** The group strip, the summary, the pack of the day and the streak card now show what is saved.
10. **Demo mode (`sobre.html` and `js/demonstracao.js`).** Two buttons for the presentation: get 5 extra packs and reset the album (with a confirmation dialog).
11. **Flags.** The 4 flags come from the `flag-icons` library (MIT license), copied into `assets/bandeiras/`. Only the SVG files were used: no library code runs on the site.
12. **Contrast.** The contrast script now checks 140 pairs, with 0 failures.

### Stage 6: the other pages (part of version `v0.4-acessibilidade`)

1. **Log in (`login.html` and `js/login.js`).** Create an account, log in and log out. It is a simulation: there is no server, and the page says so. The fields have `label`, `autocomplete` (`email`, `current-password`, `new-password`), a show-password button and error messages tied to the field. Pasting the password and using a password manager both work.
2. **The password is never stored.** What is stored is its "hash", made with the browser's `crypto.subtle` tool (SHA-256 algorithm). A hash is like a meat grinder: the password goes in, a string of letters and numbers comes out, and there is no way back. To check the password, whatever was typed is ground again and the results are compared. Before grinding, the password is mixed with a "salt", a seasoning drawn at random for each account: that way two accounts with the same password end up with different hashes. On a real site this would be done on the server, with an algorithm that is slow on purpose.
3. **One album per person.** Whoever logs in starts using their own account's album. When the account is created, the visitor's stickers come along. The menu shows "Minha conta" (My account) instead of "Entrar" (Log in).
4. **Contact (`contato.html` and `js/contato.js`).** Name, email, subject and message. When submitted with errors, each field gets its own sentence and a summary at the top lists what is missing, with a link to each field. When submitted correctly, the success message is read by screen readers (`aria-live`). Sending is simulated.
5. **Trades (`trocas.html` and `js/trocas.js`).** List of duplicates and missing stickers, text ready to copy or send via WhatsApp (a `wa.me` link) and the "banca de trocas" (trading stand), which simulates a trade: a duplicate goes out and a missing sticker comes in.
6. **Carousel of the 16 host cities (`index.html` and `js/carrossel.js`).** One host city at a time, with a stadium photo, Previous and Next buttons, a numbered button for each city and the position announced ("3 de 16: Dallas"). It does not advance on its own.
7. **Photos in a single ink.** The 16 photos come from Wikimedia Commons, under free licenses. The files are in color; CSS shows each photo as if it were printed with the page's ink (two color layers over a black-and-white photo).
8. **About (`sobre.html` and `js/sobre.js`).** What the project is, what is real and what is simulated, how it was made, the credits for fonts, flags and photos, and the data sources.

### Stage 7: the 12 groups (part of version `v0.4-acessibilidade`)

1. **From 1 to 12 groups.** The album went from 24 to 288 stickers: 48 teams, each with its flag and 5 players. Numbering follows the draw order: Group A from 1 to 24, Group B from 25 to 48 and so on.
2. **Data read by a script, not typed in.** The squads, the 72 group-stage matches and the 32 knockout matches were read from the Wikipedia pages listed in `js/dados.js`. Typing 220 players by hand would leave much more room for error.
3. **Cross-check.** Each player's number, name and club were cross-checked against a second list (Football365): 212 matched completely and 7 only by name and club, because the second list had no number. The remaining case is explained by the source itself (a player who replaced an injured one). Each player's goal total matches the scores of the 104 matches.
4. **Rule for choosing the 5 players** (every group except C, which was chosen by hand): the captain; the number 10; the team's top scorer at the World Cup; the goalkeeper with the most caps; and the players with the most caps, starting with positions that are still empty.
5. **Texts built from the data.** Each team's campaign, what it did in the knockout stage and each player's fun fact are sentences built from the numbers that were read (matches, goals, age, results). Nothing was written from memory.
6. **How it ended.** The album's last page shows the champion, the top four, the final and the awards. The result of the final was checked in three news reports besides Wikipedia.
7. **Group index.** At the top of the album, 12 boxes lead straight to each group and fill up as the group is completed.
8. **Flags.** The 48 flags come from `flag-icons` (MIT license).
9. **Speed.** The album page, with its 288 slots, is built in less than a tenth of a second.

### Stage 8: accessibility and polish (version `v0.4-acessibilidade`)

1. **Structure audit on 15 screens** (every page, with form errors, open dialogs and both themes): every image with `alt`, every field with a label, every button and link with a name, no repeated `id`, every ARIA reference pointing to something that exists, headings in order, well-formed lists. No problems found.
2. **Keyboard-only test on 9 screens.** A script presses Tab until it goes all the way around the page and checks, at each stop, whether the element is on screen, has the focus ring and is not covered. It also checks whether any control never received focus.
3. **Problem found and fixed.** With the "Desfazer" (Undo) message open, the last footer links ended up underneath it when they received focus. Now the page gets extra space at the bottom while the message is on screen.
4. **Zoom.** At 200% and 400% zoom (640 and 320 px windows), with larger text and more text spacing, the 7 pages have no horizontal scrolling and no cut-off button text.
5. **More text spacing on buttons too.** The panel option now also applies to buttons, fields and stickers.
6. **Contrast of the team colors.** The contrast script now also checks each team's drawing (number over the shirt and silhouette over the pitch): 236 pairs in total, 0 failures.

### Stage 9: publishing and documentation

1. **GitHub repository.** The project was pushed to `github.com/vitorzago1/album-copa-2026`, with the full commit history and the version tags.
2. **GitHub Pages.** The site is served straight from the `main` branch, with no build step, at `https://vitorzago1.github.io/album-copa-2026/`.
3. **Check on the live address.** The site was checked online, including creating an account and logging in, which depend on `https` to protect the password.
4. **Code appendix.** `node scripts/gerar-anexo.js` gathers all HTML, CSS and JavaScript files into `docs/anexo-codigo.md`.
5. **Links.** The site address is at the top of this README, in the footer of the 7 pages and on the About page.

### Stage 10: home page as scenes pinned to scrolling

After publishing, the site was judged "generic". Two test pages, the labs, were used to choose effects with everything working; after the choice, both were removed from the project. This stage applies the eight scenes chosen in the second lab.

1. **How a scene works.** A scene is a very tall section (for example, 240vh, almost two and a half screens). Inside it, the stage sticks to the screen (`position: sticky`). As the person scrolls through the scene, `js/cenas.js` turns the scroll into a number from 0 to 1, the progress, and calls the scene's drawing function. Scrolling back up undoes everything.
2. **The eight scenes** (`js/cenas-inicio.js` and `css/cenas.css`; in stage 15 the sentence and the groups stopped being scenes, leaving six):
   - opening: the printing dots come together to form "Colei!", drawn on a `<canvas>`;
   - the sentence that lights up, word by word;
   - the pack that spins, tears and releases five stickers (3D in CSS);
   - the album that opens, with cover and pages turning around the spine (3D in CSS);
   - the dive into the sticker, a zoom that takes over the screen;
   - the counting numbers (48, 288, 16 and 104, read from `js/dados.js`);
   - the 12 groups on a strip that moves sideways, with the flags turning into stickers in the middle of the screen;
   - the flight through the stickers, in depth.
3. **What already existed stays.** The progress, "Como funciona" (How it works), "Pacotinho do dia" (Pack of the day), "Raridades" (Rarities), the carousel of the 16 host cities and "Como trocar" (How to trade) sit between the scenes, just as before.
4. **Still version.** Without the `com-cenas` class on `<html>`, each scene is an ordinary section, with everything already in place. This is what shows with "Reduzir animações", when the device asks for reduced motion, with larger text or more text spacing (the stage is exactly one screen tall and larger text could get cut off) and without JavaScript.
5. **When the device asks for reduced motion**, the person sees the still version and a notice with a "Ligar as animações neste site" (Turn on animations on this site) button. The choice is saved and also shows up in the accessibility panel.
6. **Keyboard.** A button inside a scene may be invisible at the current scroll position. When it receives focus, the page scrolls to the point where it appears (`data-visivel-em` attribute). On the group strip, focusing a link moves the strip to that group.
7. **Nothing moves on its own for more than 5 seconds.** The swaying of the opening dots stops 5 seconds after the last gesture.

### Stage 11: the 3D pack and the frame sequence

1. **One library, with permission.** The pack became a real 3D object, drawn with Three.js (see "Technologies"). It is the only library on the site.
2. **The model** (`js/pacote3d.js`). Two sheets, front and back, made from a plane full of points. Each point is pushed outward in the middle, forming the belly of a full pack. The print (logo, perforation, halftone, serrated edge) is drawn on an ordinary `<canvas>`, with the colors from `css/tokens.css`, and applied to the sheets. The flap is a separate piece, so it can be torn off. Inside, the paper is silver.
3. **The frame sequence** (the technique used on product pages, like the AirPods one). The 3D is drawn beforehand, only once: the `scripts/quadros.html` tool puts the pack through 90 consecutive poses and saves each one as an image (`assets/img/pacotinho/claro` and `escuro`, 720 by 924 pixels, WebP format). In the home page's pack scene, scrolling chooses which of the 90 images to show. The home page does not load the library.
4. **Weight.** Each theme has about 1.35 MB of frames. Only the ones for the current theme are downloaded, after the rest of the page has loaded and only if the scenes are in motion.
5. **Plan B.** While the images have not arrived (or if one fails), the scene uses the pack drawn in CSS, with the same choreography.
6. **Live on the Packs page** (`js/pacotinho-3d.js`). The closed pack is the 3D model running in real time: it tilts as the pointer passes over it and, when torn, the flap comes off and shows the silver side. The page's rules did not change: the CSS pack is still there as the template (size, position and click), and without WebGL it is the one that shows.
7. **How to generate the frames again.** Open `scripts/quadros.html` through the local server, in Edge or Chrome, click "Salvar os quadros em uma pasta" (Save the frames to a folder) and choose `assets/img/pacotinho`.

### Stage 12: the nine effects chosen in the first lab

The first lab had 24 ideas. Nine were chosen and applied in this stage. The background textures were not chosen and were left out (the multi-paper background came later, as a separate request: stage 13).

| Effect | Where | How it is done |
|---|---|---|
| Holographic legendary | Every legendary sticker, on any page | `js/efeitos.js` records the pointer position in CSS variables; the CSS tilts the sticker and moves two layers of shine (`mix-blend-mode`) |
| Stick with a thump | Album, when sticking | Three CSS animations: the sticker drops and hits, the slot shakes and a ring of ink opens up |
| Achievement stamp | Album, achievements board | The stamp for a new achievement waits for the board to appear on screen (`IntersectionObserver`) and then strikes |
| Serrated tear and fan-out | Packs page | `clip-path` cuts the edge of the CSS pack into saw teeth; the five stickers start from the same point, fan out and each goes to its place |
| Page turn | Moving between the 7 pages | View Transitions API: one CSS rule (`@view-transition`) and two animations. Header and footer stay still |
| Enter on scroll | Album slots | `animation-timeline: view()`: the animation follows the scroll, with no JavaScript |
| Spinning scoreboard | Big number at the top of the album | Each digit is a 0-to-9 strip that rolls up to the right digit |
| Halftone that lights up | Background of the 7 pages | A layer of dots behind everything, with a mask (`mask-image`) that only reveals the ones near the mouse |
| Line that draws itself | Pitch behind the numbers (home page) and at the end of the album | `stroke-dashoffset` in SVG: the line appears little by little, with scrolling or when the section enters the screen |

1. **Where the browser does not know the technique, nothing breaks.** The page turn and enter-on-scroll do not exist in every browser yet (Firefox, for example). There, the page change is instant and the slots are already in place. With the site opened straight from the file (`file://`), the page turn does not happen either.
2. **Reduced motion.** With "Reduzir animações" (or the device asking for reduced motion): the legendary gets the shine but does not tilt; the sticker simply appears stuck in; the stamp is already struck; the slots do not move on scroll; the pitch is already drawn; the halftone that lights up disappears; the page change is instant.
3. **High contrast.** The legendary's colored shine and the halftone that lights up disappear.
4. **Scoreboard accessibility.** The spinning strips are hidden from screen readers; the number is read from ordinary text next to them.
5. **Overflow fix.** A sticker that has just been stuck in arrives larger and tilted, and went a few pixels past the edge of the screen. The slot grid now clips that overflow (`overflow-x: clip`) without creating a scrollbar.

### Stage 13: multi-paper background and scroll-down notice

Two changes from 11/22/2026: a "Desça para continuar" (Scroll down to continue) notice wherever the page needs to be scrolled, and a background that was not a single color, with more than one color and with details.

1. **Direction: "One ink, several papers".** The ink is still a single one (blue in the light theme, pink in the dark). What changes is the paper: the background goes through four papers as the page goes down (pink, peach, mint and lilac; in the dark theme, blue, purple, teal and wine) and back to the first.
2. **Halftone transition.** Between one paper and the next, dots of the next color grow line by line until they merge, like the gradient of print on paper. It is a narrow SVG image (16 by 4400 px), repeated sideways and downward. It is written inside `css/tokens.css`, and `scripts/gerar-fundo.js` draws it.
3. **Pitch lines (replaced by chalk lines in stage 14).** On top of the papers there was a football pitch seen from above, spread across the page: center circle, penalty area with the arc, corners and two printer's registration marks. They were 16 CSS gradients (`linear-gradient` and `radial-gradient`) in the page's ink, very faint (9% in the light theme, 7% in the dark).
4. **Where it lives.** In a single layer (`body::before`, in `css/base.css`), behind all content, on the 7 pages. It uses no JavaScript, does not move and does not receive clicks.
5. **Contrast.** Everything placed directly on the page (text, links, messages, borders and focus) was checked on each paper, and the text also with a pitch line over it. `node scripts/contraste.js` went from 236 to 372 pairs, with 0 failures. In high contrast the background is plain (white or black), with no papers and no lines.
6. **"Desça para continuar" notice.** Each of the eight scenes on the home page shows the notice at the bottom of the stage, with a line that runs down three times when the scene reaches the screen. The notice fades near the end of the scene. In the opening, the first screen's invitation already includes the sentence, and the stage notice comes in when the invitation leaves. The notice is created by `js/cenas.js`, for every registered scene.
7. **The notice is for the eyes only.** It is hidden from screen readers (`aria-hidden`) and does not receive clicks. In the still version (reduced motion, larger text or no JavaScript) it does not appear, because there the page is an ordinary one.
8. **Short windows.** Below 640 px of height, each group on the 12-group strip gets narrower. That way the "Ver o Grupo no álbum" (See the group in the album) link does not end up under the notice.

### Stage 14: illustrated background and centered opening

Two changes from 11/22/2026, after stage 13: the background was still "dry and artificial", only colors, and should have details and images; and the opening sentence should be centered, with the dots around it.

1. **Cut-paper collage.** On top of the stage 13 papers there are drawings that look cut out with scissors and glued to the page: a string of bunting at the top, a stadium with the sun rising behind it, stickers, a whistle, a tactics board, a ball, a goal, a shirt, a corner flag, a pack, a stopwatch, cards, stars and confetti.
2. **Original drawings.** All of them are made by `scripts/gerar-fundo.js` with simple shapes (circles, polygons and strokes). There are no photos, logos or emblems. The edges come out slightly crooked on purpose: each point is nudged a tiny bit by a draw that repeats the same way every time.
3. **One file per theme.** `assets/img/fundo/colagem-claro.svg` and `colagem-escuro.svg`, about 55 KB each. The drawing is the same; the colors change. The page only downloads the one for the current theme.
4. **Paper colors only.** The collage uses six colors from `css/tokens.css`: the four papers and two new ones, the highlight (paper white; in the dark theme, the deepest blue) and the accent (yellow; in the dark theme, green). Text may pass over a drawing, so all of them go into the contrast check: `node scripts/contraste.js` checks 396 pairs, with 0 failures.
5. **Chalk pitch.** The gray pitch lines from stage 13 were removed. Instead, the green band got the halfway line and the center circle drawn in the highlight color, like chalk.
6. **Grain and stains.** Two SVG images with a noise filter (`feTurbulence`): a fine speckle over everything and broad, faint clouds under the collage. In the light theme they only lighten the paper; in the dark theme they only darken it. That is why they do not reduce the contrast of the text.
7. **Mobile.** The whole drawing (papers and collage) is shown at half size, so the stadium and the ball fit on the screen.
8. **High contrast.** The background stays plain: no collage, grain or stains.
9. **Centered opening.** In motion, the invitation ("A Copa acabou. Seu álbum, não." / "The World Cup is over. Your album isn't.", the two buttons and the scroll-down notice) sits in the middle of the first screen. The dots go around each line of text: they do not pass behind it and get smaller near it. In the still version the opening stays as it was, with the invitation on the left and the logo beside it.
10. **Discarded attempt.** A photo of a stadium printed in halftone was tested. With the light colors that the contrast rules allow, the photo became a shapeless blur. The idea was replaced by the drawn stadium.

### Stage 15: a sentence that lights up on its own, a group carousel and brighter colors

Three changes from 11/23/2026: slightly brighter colors; the sentence "São 48 seleções..." ("There are 48 teams...") becoming just an animation, with no need to scroll through it; and the 12 groups becoming a carousel, also with no need to scroll down.

1. **A sentence that lights up on its own.** It is no longer a scene pinned to scrolling. When it appears on screen, the words light up one after another and the underline draws itself, in under 4 seconds, only once. An `IntersectionObserver` reports that it appeared; the CSS lights it up (each word waits 110 milliseconds longer than the previous one).
2. **No motion, no wait.** With "Reduzir animações", with the device asking for reduced motion or without JavaScript, the sentence is already fully lit.
3. **Group carousel.** The twelve groups sit side by side on a strip that scrolls sideways (using the browser's own scrolling, with `scroll-snap`). "Anterior" and "Próximo" (Previous and Next) buttons, one indicator per group (A to L) and the position written out ("3 de 12: Grupo C"), read by screen readers at each change. It can also be swiped with a finger or scrolled with the mouse.
4. **The middle group gets color.** The effect from the old scene stayed: the flag is printed in a single ink and, for the group in the middle of the window, it turns into a colored sticker.
5. **Where the code is.** The group carousel lives in `js/carrossel.js`, together with the host-city one. The CSS for both sections is still in `css/cenas.css`.
6. **Six scenes.** The home page went from eight to six scenes pinned to scrolling (opening, pack, album, dive, numbers and flight) and became shorter.
7. **Brighter colors.** The four papers of both themes and the yellow of the cut-outs got more color, without touching the text ink. The background was redrawn with `node scripts/gerar-fundo.js` and the contrast checked again: 396 pairs, 0 failures (the lowest value is 4.62:1).
8. **Reduced motion even more direct.** The general "Reduzir animações" rule now also sets transition delays to zero (`transition-delay`).

### Stage 16: new portrait on the stickers

Change from 11/23/2026: the stickers were "really ugly" and the players looked like dolls. The first idea was to use photos, but the project forbids player photos; the choice was a more human drawing.

1. **The portrait.** A person facing forward, from head to shoulders: face, ears, neck, eyebrows, eyes, nose and mouth, hair, a shirt with collar and sleeves, and the number on the chest. Before, it was a circle and a half circle. The drawing is an SVG built by the `desenharRetrato` function, in `js/figurinha.js`.
2. **Four haircuts.** Short, side-parted, curly and shaved. The haircut comes from the sticker's number: the same sticker always has the same one, and the album does not become a row of identical portraits.
3. **Generic on purpose.** The portrait does not try to look like the real player and is not a photo. The skin has no skin color: it is the sticker's paper with a little of the ink, as in a one-ink print. That way the drawing does not "guess" anyone's appearance.
4. **Team colors.** The shirt, the collar and the number use the three colors of each team that were already in `js/dados.js`.
5. **Small flag.** Each player sticker got the team's flag in the top corner. It has no alternative text, because the team's name is already written on the label.
6. **Portrait background.** A glow behind the head, and the halftone dots now stay only in the background (before, they ran over the drawing).
7. **What did not change.** The sticker text (name, team, rarity and number), the three rarities, the back, the reverse and the flag sticker.
8. **Contrast.** The portrait outline is the sticker ink over each team's background color, and the number sits on the shirt: both stay above 3:1 for all 48 teams (`node scripts/contraste.js`).

## Where each item requested by the professor is

| Item | Where |
|---|---|
| Cards | Stickers (`album.html`, `pacotinhos.html`), "É uma simulação" (It is a simulation) cards (`login.html`, `contato.html`), pack coupon and trade ticket (`index.html`) |
| Search tabs | `album.html`: search, tabs Todas, Tenho, Faltam and Repetidas, and filters for group, team, position and rarity |
| Contact with a form | `contato.html` |
| Image carousel | `index.html`: "As 16 sedes" section (stadium photos) and "12 grupos, de A a L." section (flags). Code in `js/carrossel.js` |
| Images | Photos of the 16 stadiums (`assets/img/sedes/`), 48 flags (`assets/bandeiras/`) and original drawings in SVG and CSS |
| Explanatory cards | `index.html`: "Como funciona", "Pacotinho do dia", "Raridades" and "Como trocar" |
| Animations and 3D | `index.html`: six scenes pinned to scrolling and the sentence that lights up on its own (`css/cenas.css`, `js/cenas.js` and `js/cenas-inicio.js`), all with a still version; 3D pack in scene 2 (frame sequence) and on `pacotinhos.html` (live); nine effects on the other pages (stage 12 table) |
| Dark and light mode | Accessibility panel (button in the header of every page); colors in `css/tokens.css` |
| Footer | The same on all 7 pages, with navigation, GitHub link and credits |
| Login page | `login.html` (simulation, with the password stored only as a hash) |
| Accessibility tab | "Acessibilidade" button in the header: theme, text size, high contrast, reduce animations (or show them, when the device asks for less), more text spacing and highlight links |
| WCAG and contrast analysis | `docs/decisoes.md` (criterion by criterion) and `docs/cores.md` (table calculated by `scripts/contraste.js`) |
| Color psychology | `docs/cores.md`, "Motivo" (Reason) column |
| GitHub with versions | Commit history and tags `v0.1` to `v0.4`; `CHANGELOG.md` |
| Step-by-step README | `README.md` (Portuguese) and this file (English) |
| References and AIs used | `docs/referencias.md` and the About page |
| Live site | https://vitorzago1.github.io/album-copa-2026/ (GitHub Pages) |

## How to check accessibility

- **Contrast.** With Node.js installed, in the project folder, run `node scripts/contraste.js`. The script rewrites `docs/cores.md` and warns if any color pair fails. If you change a background paper color, first run `node scripts/gerar-fundo.js`, which redraws the background with the new color.
- **Lighthouse (not run yet).** In Edge or Chrome, open the site, press F12, choose the "Lighthouse" tab, select only "Accessibility" and click "Analyze page load". Write down each page's score in `docs/decisoes.md`.
- **Keyboard only.** Use Tab, Shift+Tab, Enter, Space, the arrows (on the album tabs) and Esc (to close the panel and the menu).
- **Reduced motion.** In the accessibility panel, turn on "Reduzir animações": the home page then shows each scene still. On Windows, the same happens with Settings, Accessibility, Visual effects, "Animation effects" turned off.
- **Screen reader (not tested yet).** On Windows, NVDA is free: https://www.nvaccess.org/

## Technologies

- Plain HTML, CSS and JavaScript, with no framework and no build step.
- Git and GitHub for the version history.
- Node.js only to run the support scripts: contrast, page background and code appendix (the site itself does not need it).
- The page background uses only CSS and SVG: two SVG files (the collage, one per theme), SVG images written inside the CSS itself (`data:`) and the `feTurbulence` noise filter.
- `flag-icons` (MIT license): only the flag images, copied into the project. Reason: drawing each flag faithfully by hand would take a lot of work and leave more room for error, and the project brief allows flags from a source with a free license.
- Photos from Wikimedia Commons (CC BY, CC BY-SA, CC0 and public domain licenses), with each one's author and license on the About page and in `docs/referencias.md`.
- `crypto.subtle` (built into the browser): calculates the password hash. It is not an external library.
- The home page scenes use only browser features: `position: sticky`, CSS 3D transforms (`perspective`, `rotateY`, `translateZ`), `<canvas>` and `requestAnimationFrame`.
- The stage 12 effects also use only browser features: View Transitions API, scroll-driven animations (`animation-timeline`), `clip-path`, `mask-image`, `mix-blend-mode`, `IntersectionObserver` and pointer events.
- **Three.js r128 (MIT license), the only library on the site.** It is stored in `js/vendor/three.min.js`, with the license next to it.
  - What it is for: drawing the pack in 3D (light, reflections of laminated paper, texture).
  - Where it runs: on the Packs page (live pack) and in the `scripts/quadros.html` tool (which generates the frame sequence). The home page and the other five pages do not load it.
  - Why a library: the browser draws 3D with WebGL, a very low-level interface. Light, reflections and texture in plain WebGL would take hundreds of lines of graphics-card code. With the library, `js/pacote3d.js` describes the pack in terms of sheet, material and lamp.
  - Why this version: it has a single file that works with an ordinary `<script src>`, without `type="module"`, as the project requires so it can be opened straight from the file. Current versions of the library are distributed as modules.
  - Where it came from: cdnjs (`cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`), downloaded on 11/21/2026. The file's signature (SHA-512) was checked against the one published by cdnjs.
  - Without it: if the file does not load or the browser has no WebGL, the Packs page shows the pack drawn in CSS and works the same.

## Documentation

- `docs/cores.md`: theme palettes, the reason for each color and the calculated contrast table.
- `docs/decisoes.md`: design decisions and where each WCAG criterion and each Nielsen heuristic was applied.
- `docs/referencias.md`: sources for the data, fonts and images, documentation consulted, tools and AIs used.
- `docs/prints/`: screenshots of each version, in the light and dark themes, on desktop and mobile.
- `docs/anexo-codigo.md`: all of the project's code in a single file, generated by `node scripts/gerar-anexo.js`.
- `CHANGELOG.md`: what changed in each version.

The documents in `docs/` and the `CHANGELOG.md` are in Portuguese.

## How to publish on GitHub Pages

GitHub Pages is GitHub's free hosting: it takes the files in the repository and serves them as a website. Since this project has no build step, it is enough to push the files.

1. Create an empty repository on GitHub called `album-copa-2026`, in the `vitorzago1` account (no README, no license and no `.gitignore`, because the project already has its own).
2. In the project folder, link the folder to the repository and push the history with the version tags:

   ```
   git remote add origin https://github.com/vitorzago1/album-copa-2026.git
   git push -u origin main --tags
   ```

3. On GitHub, open Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", the `main` branch and the `/ (root)` folder. Save.
4. Wait a minute or two. The address will be `https://vitorzago1.github.io/album-copa-2026/`.
5. Put that address at the top of this README and check the site through it (especially the Log in page, which depends on `https` to protect the password).

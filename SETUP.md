# KyleSeraphin.com: setup guide

**Cost:** hosting is **$0** (GitHub Pages or Cloudflare Pages free tier). The contact form is **$0** (Web3Forms free tier, 250 messages/month). The only cost is the domain renewal you already pay GoDaddy. Email stays exactly where it is.

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The whole page |
| `styles.css` | Look and layout |
| `sponsors.js` | **Your sponsor list. Edit this one file to add or change sponsors.** |
| `main.js` | Builds the sponsor cards and sends the contact form |
| `assets/` | Favicon, headshot placeholder, sponsor logo placeholder, social share image |

### Quick edits
- **Sponsors and affiliates:** open `sponsors.js`. There are two lists, `SPONSORS` and `AFFILIATES`. Each entry has a name, blurb, promo code (leave `""` if the link itself carries the discount), link, and logo. Logos go in `assets/sponsors/`. Change `SPONSORS_UPDATED` when you refresh the list, and the "Updated …" note on the page changes with it.
- **Headshot:** `assets/headshot.webp` and `assets/headshot.jpg` (600×600). Replace both files and keep the same names.
- **Show logo:** `assets/show-logo.png` is a transparent version of the show wordmark.
- **Icons:** `assets/favicon-32.png`, `assets/apple-touch-icon.png`, and `assets/icon-512.png` show a red "KS" icon cut from the logo.
- **Share image:** `assets/og-image.jpg` (1200×630) is what X, Facebook, and iMessage show when someone shares the link.
- The Spotify and YouTube players update themselves. The Spotify one shows the newest episode. The YouTube one shows your newest upload, and a live stream appears there once it ends. The "Watch live" link goes to the live stream while it's on.

---

## Step 1: Turn on the contact form (Web3Forms, about 1 minute)

1. Go to <https://web3forms.com>, enter **info@KyleSeraphin.com**, and click **Create Access Key**.
2. Check the info@ inbox for the access key, a long string like `a1b2c3d4-...`.
3. In `index.html`, the access key is already set in the contact form (done).
4. Done. Messages from the form arrive at info@KyleSeraphin.com. A hidden "honeypot" field already blocks most spam bots.

(Alternative: Formspree free tier. Change the form's `action` to your Formspree endpoint and remove the `access_key` hidden input.)

---

## Step 2: Put the site online (free)

Your email (Microsoft 365 through GoDaddy) runs on GoDaddy's DNS. **Option A keeps everything at GoDaddy and never touches email. It's the recommended option.**

### Option A (recommended): GitHub Pages, with DNS staying at GoDaddy
1. Create a free account at <https://github.com>. Your username becomes part of a hostname below, e.g. `kyleseraphin.github.io`.
2. Click **New repository**, name it anything (e.g. `kyleseraphin-site`), make it **Public**, and create it.
3. Click **Add file → Upload files** and drag in **everything inside** this folder (`index.html`, `styles.css`, `sponsors.js`, `main.js`, the `assets` folder). Click **Commit changes**.
4. Open **Settings → Pages**. Under "Build and deployment," set Source to **Deploy from a branch**, Branch to **main / (root)**, and click **Save**.
5. On the same page, under **Custom domain**, enter `kyleseraphin.com` and click **Save**. Do Step 3 below, then come back and tick **Enforce HTTPS** once it's available (it can take up to an hour or so).

### Option B: Cloudflare Pages (drag-and-drop upload)
1. Create a free account at <https://dash.cloudflare.com>, then go to **Workers & Pages → Create → Pages → Upload assets**.
2. Name the project (e.g. `kyleseraphin`), drag in this folder or the zip, and click **Deploy**. You get a free `kyleseraphin.pages.dev` address.
3. Under **Custom domains**, add `www.kyleseraphin.com`.
   - **Limitation:** Cloudflare Pages only serves the bare `kyleseraphin.com` (no www) if the domain's **nameservers are moved to Cloudflare**. If you **don't** move nameservers, use `www` on Cloudflare and have GoDaddy forward the bare domain to `https://www.kyleseraphin.com` (see Step 3, Option B).
   - **If you do move nameservers to Cloudflare:** first copy **every** record from GoDaddy's DNS page into Cloudflare: all **MX**, **TXT** (including the SPF `v=spf1 include:secureserver.net -all` and the `NETORGFT…onmicrosoft.com` Microsoft verification), **CNAME** records such as `autodiscover`, `selector1._domainkey` / `selector2._domainkey` (DKIM), `_dmarc`, and any **SRV** records. Missing any of these breaks email. Most people should just use Option A.

---

## Step 3: Point KyleSeraphin.com at the new site in GoDaddy

> ⚠️ **Do NOT change nameservers** (leave them as `ns67/ns68.domaincontrol.com`) unless you're following the Cloudflare nameserver path above.
> ⚠️ **Do NOT edit or delete** any **MX**, **TXT** (SPF / `NETORGFT…` verification / DMARC), **autodiscover**, **_domainkey (DKIM)**, or **SRV** records. Those run your info@ email.

### 3a. Remove the old Linktree redirect first
Right now KyleSeraphin.com and www both send visitors to `https://linktr.ee/kyleseraphin`. That redirect comes from **GoDaddy Domain Forwarding**. The domain's A records currently point at GoDaddy's forwarding servers, `15.197.225.128` and `3.33.251.168`.

1. Sign in to GoDaddy and go to **My Products → Domains → kyleseraphin.com → DNS**.
2. Open the **Forwarding** tab (or the "Forwarding" section on the DNS page). If a forward points to `linktr.ee/...`, **delete it**. Do this for both the **domain** forward and any **subdomain (www)** forward.
3. Back on the **DNS Records** tab, look at the **A** record(s) for **@** and the **CNAME** for **www**. Removing the forward often removes the `15.197.225.128` / `3.33.251.168` A records automatically. If they're still there, or there's any A/CNAME mentioning Linktree, **delete only those** `@` A records and the `www` CNAME. Leave everything else alone.

### 3b. Add the new records

**For Option A (GitHub Pages):**

| Type | Name | Value | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |
| CNAME | www | `YOURGITHUBUSERNAME.github.io` | 1 hour |

GitHub sends `www` to the bare domain automatically. Back in GitHub **Settings → Pages**, wait for the green "DNS check successful" message, then tick **Enforce HTTPS**.

**For Option B (Cloudflare Pages, nameservers stay at GoDaddy):**

| Type | Name | Value |
|---|---|---|
| CNAME | www | `kyleseraphin.pages.dev` (your project's address) |

Then, under GoDaddy **Forwarding**, add a **domain** forward: `kyleseraphin.com` → `https://www.kyleseraphin.com`, **Permanent (301)**, **Forward only** (not masked).

### 3c. Check it
DNS changes usually show up in 5–60 minutes, and can take up to 24–48 hours. Visit `https://kyleseraphin.com` and `https://www.kyleseraphin.com`. Then send a test message from the contact form and a normal email to info@, to confirm email still works.

---

## Updating later
- **GitHub Pages:** open the file in the repo, click the ✏️ pencil, edit, then **Commit**. The site updates in about a minute.
- **Cloudflare Pages:** go to **Create new deployment** and drag in the updated folder.

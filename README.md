# EasyNet2003

Sito web aziendale per EasyNet2003, sviluppato con Next.js 15 e Payload CMS 3.0.

## 🚀 Stack Tecnologico

- **Frontend**: Next.js 15.4.4 (App Router), React 19.1.0
- **CMS**: Payload CMS 3.59.1
- **Database**: PostgreSQL (Supabase)
- **Storage**: S3-compatible (per media)
- **Styling**: Bootstrap 5.3.8, SCSS Modules
- **Package Manager**: pnpm
- **Deployment**:
  - Frontend: Netlify
  - Database: Supabase (PostgreSQL)
  - Media: S3 Storage

## 📁 Struttura del Progetto

```
src/
├── app/
│   ├── (frontend)/          # Route pubbliche del sito
│   │   ├── page.tsx         # Homepage
│   │   ├── news/            # Pagina news con paginazione
│   │   ├── clienti/         # Pagina clienti (grid)
│   │   ├── partners/        # Pagina partners (grid)
│   │   ├── privacy/         # Privacy policy (SimplePage)
│   │   ├── cookie/          # Cookie policy (SimplePage)
│   │   └── ...              # Altre pagine dinamiche
│   └── (payload)/           # Admin panel Payload CMS
│       └── admin/           # Interfaccia amministrativa
├── collections/             # Collections Payload CMS
│   ├── Users.ts
│   ├── Media.ts
│   ├── News.ts
│   ├── HeroImage.ts
│   ├── Experience.ts
│   ├── BestPractice.ts
│   ├── PageWithSections.ts
│   └── SimplePage.ts
├── components/              # Componenti React riutilizzabili
│   ├── hero/
│   ├── news/
│   ├── experience/
│   ├── best_practice/
│   ├── footer/
│   └── sidebar/
├── lib/                     # Utility functions
│   └── textFormatting.tsx   # Parser per testo formattato
└── payload.config.ts        # Configurazione Payload CMS

public/
└── media/                   # File statici (immagini, documenti)
    ├── clienti/            # Logo clienti
    ├── partners/           # Logo partners
    └── docs/               # Documenti PDF
```

## 🛠️ Setup e Installazione

### Prerequisiti

- Node.js >= 18.20.2 o >= 20.9.0
- pnpm >= 9 o >= 10
- PostgreSQL (locale o Supabase)

### Installazione

1. **Clona il repository**

   ```bash
   git clone <repository-url>
   cd easynet2003
   ```

2. **Installa le dipendenze**

   ```bash
   pnpm install
   ```

3. **Configura le variabili d'ambiente**

   Crea un file `.env` nella root del progetto (controllare se già presente) con:

   ```env
   # Database
   DATABASE_URI=postgresql://user:password@host:port/database

   # Payload CMS
   PAYLOAD_SECRET=your-secret-key-here

   # S3 Storage (per media)
   S3_BUCKET=your-bucket-name
   S3_ACCESS_KEY_ID=your-access-key
   S3_SECRET_ACCESS_KEY=your-secret-key
   S3_REGION=us-east-1
   S3_ENDPOINT=your-s3-endpoint
   ```

4. **Genera i tipi TypeScript**

   ```bash
   pnpm generate:types
   ```

5. **Avvia il server di sviluppo**

   ```bash
   pnpm run dev
   ```

   Il sito sarà disponibile su `http://localhost:3000`
   L'admin panel Payload sarà su `http://localhost:3000/admin`

## 📜 Comandi Disponibili

| Comando                   | Descrizione                              |
| ------------------------- | ---------------------------------------- |
| `pnpm run dev`            | Avvia il server di sviluppo              |
| `pnpm run devsafe`        | Avvia il server pulendo la cache `.next` |
| `pnpm build`              | Compila l'applicazione per la produzione |
| `pnpm start`              | Avvia il server di produzione            |
| `pnpm run generate:types` | Genera i tipi TypeScript da Payload      |
| `pnpm generate:importmap` | Genera la mappa degli import per Payload |
| `pnpm lint`               | Esegue il linter ESLint                  |

## 🗄️ Collections Payload CMS

### Users

Gestione utenti e autenticazione per l'admin panel.

### Media

Upload e gestione di immagini e file multimediali. I file vengono salvati su S3.

### News

Articoli di news con:

- Titolo
- Contenuto
- Immagine
- Data
- Link esterno

### HeroImage

Immagini per il carosello hero della homepage con:

- Immagine
- Titolo
- Sottotitolo
- Bottone CTA (testo + URL)
- Ordine di visualizzazione
- Flag attivo/inattivo

### Experience

Sezione esperienze con carosello di progetti/casi studio.

### BestPractice

Sezione best practices con esempi e casi d'uso.

### PageWithSections

Pagine dinamiche con sezioni multiple, ognuna contenente:

- Immagine
- Titolo sezione
- Sottotitolo
- Contenuto

### SimplePage

Pagine semplici con solo:

- Titolo
- Descrizione (textarea)

## 🛣️ Routing

Il progetto utilizza il **file-based routing** di Next.js 15 con App Router.

### Route Principali

- `/` - Homepage con hero, experience, best practices e news
- `/news` - Lista completa delle news con paginazione (10 per pagina)
- `/clienti` - Grid di logo clienti cliccabili
- `/partners` - Grid di logo partners cliccabili
- `/privacy` - Privacy policy (SimplePage)
- `/cookie` - Cookie policy (SimplePage)
- `/easynet2003` - Pagina aziendale (PageWithSections)
- `/admin` - Admin panel Payload CMS

### Routing Dinamico

Le pagine possono essere create dinamicamente tramite Payload CMS:

- **PageWithSections**: Cerca per titolo nella collection `page-with-sections`
- **SimplePage**: Cerca per titolo nella collection `simple-page`

## 🎨 Styling

- **Bootstrap 5.3.8**: Framework CSS per layout e componenti
- **SCSS Modules**: Stili modulari per componenti (`*.module.scss`)
- **Global Styles**: `src/app/(frontend)/styles.css` per stili globali
- **Font**: Raleway (Google Fonts) con tutti i pesi

### Convenzioni

- Ogni componente ha il proprio file `.module.scss`
- Gli stili globali sono in `styles.css`
- I media statici sono in `public/media/`

## 📦 Funzionalità Principali

### Text Formatting

La funzione `parseFormattedText` supporta:

- **Testo in grassetto**: `**testo**`
- **Line breaks**: `\n` o `\\n`

## 🚢 Deployment

### Netlify (Frontend)

Il progetto è configurato per il deployment su Netlify tramite `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = ".next"
```

**Variabili d'ambiente da configurare su Netlify:**

- `DATABASE_URI`
- `PAYLOAD_SECRET`
- `S3_BUCKET`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`
- `S3_REGION`
- `S3_ENDPOINT`

> **Deploy**: effettuare push sul branch `master/main` per innescare il deploy automatico su Netlify.

### Supabase (Database)

Il database PostgreSQL è ospitato su Supabase. La connection string è fornita tramite `DATABASE_URI`.

### S3 Storage (Media)

I file multimediali vengono caricati su storage S3-compatible. Configurare le credenziali nelle variabili d'ambiente.

## 🔧 Configurazione Avanzata

### Payload CMS

La configurazione è in `src/payload.config.ts`:

- Editor: Lexical
- Database: PostgreSQL adapter
- Storage: S3 per la collection `media`
- Row Level Security (RLS) abilitato su tutte le tabelle

### Next.js

Configurazione in `next.config.mjs`:

- Webpack configurato per supportare estensioni `.cjs`, `.mjs`
- Integrazione Payload CMS tramite `withPayload`

## 📝 Note Importanti

1. **pnpm**: Il progetto usa esclusivamente `pnpm`, non `npm` o `yarn`
2. **Media**: Tutti i file media devono essere in `public/media/`
3. **Types**: Dopo modifiche alle collections, eseguire `pnpm generate:types`
4. **SearchParams**: In Next.js 15, `searchParams` è una Promise e deve essere awaitata
5. **Server Components**: Tutte le pagine sono Server Components per default

## ✅ TODO - Funzionalità da Implementare

Questa sezione elenca le funzionalità e le pagine ancora da sviluppare per completare il sito.

### 1. Pagina "Cosa Facciamo"

**Obiettivo**: Creare una pagina che descriva i servizi e le attività dell'azienda.

**Passi da seguire**:

1. **Creazione del contenuto tramite Admin Panel**:
   - Accedere al pannello amministrativo su `/admin` con le credenziali fornite
   - Navigare alla collection **PageWithSections**
   - Creare una nuova entry con:
     - **Titolo**: "Cosa Facciamo" (o il titolo desiderato)
     - **Slug/URL**: `cosa-facciamo` (verrà usato per la route)
     - Aggiungere le sezioni necessarie (immagine, titolo sezione, sottotitolo, contenuto)
     - Salvare la pagina

2. **Creazione della route frontend**:
   - Creare il file `src/app/(frontend)/cosa-facciamo/page.tsx`
   - Implementare la logica per recuperare la pagina dalla collection `PageWithSections` usando il titolo o lo slug
   - Utilizzare il componente esistente per le pagine con sezioni (se presente) o creare un nuovo componente
   - Seguire il pattern delle altre pagine dinamiche (es. `/easynet2003`)

3. **Styling**:
   - Creare o adattare gli stili necessari in un file `.module.scss`
   - Assicurarsi che il layout sia responsive e coerente con il resto del sito

**Note**:

- Verificare che il routing dinamico funzioni correttamente
- Testare la visualizzazione su mobile e desktop
- Assicurarsi che le immagini siano ottimizzate

---

### 2. Pagina Contatti con Form Email

**Obiettivo**: Creare una pagina contatti con un form che invii email a un indirizzo predefinito.

**Passi da seguire**:

1. **Creazione della pagina**:
   - Creare `src/app/(frontend)/contatti/page.tsx`
   - Progettare il form con i campi necessari (nome, email, messaggio, ecc.)
   - Implementare la validazione lato client

2. **Configurazione email**:
   - **Opzione A - Gmail con App Password (SMTP)**:
     - Creare un account Gmail dedicato (o usare uno esistente)
     - Generare una App Password: Google Account → Sicurezza → Verifica in due passaggi → Password delle app
     - Installare una libreria SMTP (es. `nodemailer`): `pnpm add nodemailer`
     - Configurare le variabili d'ambiente:
       ```env
       SMTP_HOST=smtp.gmail.com
       SMTP_PORT=587
       SMTP_USER=your-email@gmail.com
       SMTP_PASSWORD=your-app-password
       CONTACT_EMAIL=recipient@example.com
       ```
   - **Opzione B - API di terze parti**:
     - Considerare servizi come SendGrid, Mailgun, Resend, o Postmark
     - Installare la libreria corrispondente
     - Configurare la chiave API nelle variabili d'ambiente

3. **Creazione API Route**:
   - Creare `src/app/api/contact/route.ts` (Server Action o API Route)
   - Implementare la logica di invio email
   - Gestire errori e validazione lato server
   - Implementare rate limiting per prevenire spam

4. **Integrazione frontend**:
   - Collegare il form alla API route
   - Implementare feedback visivo (loading, success, error)
   - Aggiungere protezione CSRF se necessario

5. **Styling**:
   - Creare `src/components/contact/ContactForm.module.scss`
   - Assicurarsi che il form sia accessibile e user-friendly

**Note**:

- Considerare l'aggiunta di un captcha (reCAPTCHA, hCaptcha) per prevenire spam
- Implementare sanitizzazione dell'input per sicurezza
- Testare l'invio email in ambiente di sviluppo e produzione
- Configurare le variabili d'ambiente anche su Netlify

---

### 3. Deploy in Produzione

**Obiettivo**: Configurare il deployment su Netlify per l'ambiente di produzione.

**Passi da seguire**:

1. **Preparazione del repository**:
   - Assicurarsi che il codice sia sul branch corretto (es. `main` o `master`)
   - Verificare che tutti i test passino
   - Eseguire un build locale per verificare che non ci siano errori: `pnpm build`

2. **Configurazione Netlify**:
   - Accedere al dashboard Netlify
   - Dal menu, selezionare **Site settings** → **Build & deploy** → **Continuous Deployment**
   - Cambiare il repository collegato:
     - Cliccare su **Link to a different repository**
     - Selezionare il repository di produzione corretto
     - Configurare il branch di deploy (es. `main`)
3. **Configurazione variabili d'ambiente**:
   - Andare su **Site settings** → **Environment variables**
   - Aggiungere tutte le variabili necessarie:
     - `DATABASE_URI` (database di produzione)
     - `PAYLOAD_SECRET`
     - `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_ENDPOINT`
     - Variabili per email (se implementata la pagina contatti)
   - Verificare che siano impostate per l'ambiente **Production**

4. **Configurazione dominio**:
   - Andare su **Site settings** → **Domain management**
   - Aggiungere il dominio personalizzato:
     - Cliccare su **Add custom domain**
     - Inserire il dominio (es. `easynet2003.it`)
     - Seguire le istruzioni per configurare i DNS
     - Configurare SSL/TLS (di solito automatico con Netlify)
5. **Build settings**:
   - Verificare che `netlify.toml` sia configurato correttamente
   - Impostare la versione di Node.js se necessario (Netlify → Site settings → Build & deploy → Environment)
   - Configurare il comando di build: `pnpm build`
   - Impostare la directory di publish: `.next`

6. **Test del deploy**:
   - Eseguire un deploy manuale o push sul branch principale
   - Verificare che il build sia completato con successo
   - Testare tutte le funzionalità sul sito di produzione
   - Verificare che le variabili d'ambiente siano caricate correttamente

7. **Post-deploy**:
   - Verificare che il CMS Payload sia accessibile su `/admin`
   - Testare il caricamento di media su S3
   - Verificare le connessioni al database
   - Controllare i log di Netlify per eventuali errori

**Note**:

- Documentare le credenziali e le configurazioni in un luogo sicuro
- Verificare che il dominio sia configurato correttamente con i DNS del provider

---

## 🐛 Troubleshooting

### Errori comuni

**"searchParams should be awaited"**

- In Next.js 15, `searchParams` è una Promise. Usa: `const params = await searchParams`

**Errori di build su Netlify**

- Verifica che tutte le variabili d'ambiente siano configurate
- Controlla che Node.js versione sia >= 20

**Media non caricati**

- Verifica le credenziali S3
- Controlla che il bucket sia accessibile

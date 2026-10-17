# Connect website enquiries to your Google Sheet

Target spreadsheet: [MetaVex lead sheet](https://docs.google.com/spreadsheets/d/12u53bB6dwodEZS2aepGuyXqPhm35FxxoBPEiIsXDSJk/edit?gid=0), tab `gid=0`.

The website sends requests to `/api/leads`. That backend validates the data and calls the Apps Script web app. The form shows success only when the script confirms the row was saved. WhatsApp and email remain available if saving fails.

**Current status:** code is ready; live saving requires the spreadsheet owner to deploy Apps Script and configure the backend. The private spreadsheet contents have not been inspected or changed during this work.

## 1. Prepare the sheet as its owner

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Paste the contents of [Code.gs](./Code.gs) into the script editor and save.
3. Run `setupLeadSheet` once and authorize access using the spreadsheet owner's account.
4. The script adds headers only to an empty tab. If it reports `SCHEMA_MISMATCH`, it has found existing content with different headers and stops without replacing it. Preserve that data and adapt the column mapping before proceeding.
5. Open **Project Settings → Script Properties**. Copy the generated `LEADS_WEBHOOK_SECRET` into your private backend environment settings. Do not put it in Angular source, a public repository, browser code, or chat.

## 2. Deploy the script

1. Choose **Deploy → New deployment → Web app**.
2. Set **Execute as: Me** (the spreadsheet owner) and **Who has access: Anyone**. The script rejects requests without the shared secret.
3. Deploy, authorize if prompted, and copy the URL ending in `/exec`. A `/dev` editor test URL is not the production endpoint.
4. After future script changes, update the deployed version through **Manage deployments**.

Google Workspace policies may restrict anonymous web app access. If that option is unavailable, the owner must resolve the policy or choose another authenticated backend.

## 3. Configure the website backend

For Vercel, add these project environment variables to the intended deployment environment and redeploy:

```text
LEADS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
LEADS_WEBHOOK_SECRET=the value from Apps Script Properties
```

The same secret must be present in both locations. There are no credentials to add to the client. `vercel.json` preserves the `/api/leads` function and serves each prerendered public page separately.

For local development, copy `.env.example` to `.env.local`, fill in those values privately, and run these commands in two terminals:

```powershell
pnpm run api
pnpm start
```

Angular runs at `http://localhost:4200` and proxies `/api/**` to `127.0.0.1:4301`. Without configuration, the API returns `503 CAPTURE_NOT_CONFIGURED`; it does not invent a successful save.

## 4. Verify one real request after deployment

Submit a clearly identified test brief with a contact number you control. Confirm one row appears in the intended tab with the matching request ID and Indian time. Retry the same request after a simulated connection failure and confirm it does not create a duplicate. Check both an ordinary contact brief and a brief opened from the growth planner.

The planner columns store the visitor's assumptions and illustrative calculations, not promised outcomes. Optional email can be blank. Phone is required. The script guards formula-like text and counts requests per hashed source in a short cache window. This is basic abuse protection, not a substitute for monitoring public submissions.

Restrict spreadsheet access to the people who need to respond to enquiries. Set a retention policy appropriate to your actual business before collecting at scale. No marketing mailing list consent is implied by the inquiry form.

Implementation references: [Apps Script web apps](https://developers.google.com/apps-script/guides/web), [Content Service redirects](https://developers.google.com/apps-script/guides/content), [Vercel Node.js functions](https://vercel.com/docs/functions/runtimes/node-js).

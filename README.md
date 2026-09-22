# ty_yak_fe

Administration panel for [ty_yak_be](https://github.com/konstde00/ty_yak_be), the emergency
check-in service: one person asks the people who matter to them whether they are safe, and each
of them answers. "Ти як?" is Ukrainian for "how are you".

![Check-in screen with the three answers](docs/check-in.png)

## What it does

**Check in.** One screen, three answers: I'm fine, Okay for now, I need help. Each answer is
recorded through `PATCH /api/statuses/v1` and the backend tells everyone in the person's
circle. The screen then shows what was sent and when, and lets the person answer again when
things change.

**Circle.** The person's last answer, what each answer means, and group administration
(rename, add or remove a member) through `PUT /api/groups/v1`.

**Administration.** Sign-in and registration by e-mail, password recovery through a
confirmation code, an activity chart of the most active subscribers, export of that report as
a Word or Excel file, and bulk enrolment of a roster from a Word or Excel file.

| Sign in | Answer sent | Circle |
|---|---|---|
| ![Sign in](docs/login.png) | ![Answer sent](docs/answer-sent.png) | ![Circle](docs/circle.png) |

## How it is organized

| Directory | Responsibility |
|---|---|
| `src/components` | screens: `CheckIn`, `Circle`, `Login`, `Registration`, `RestorePassword`, `Home`, `Charts`, `Files`, and the shared `NavBar` |
| `src/routes` | route table and the `PrivateRoute` guard |
| `src/api` | requests to the backend (`status.js`, `groups.js`, `files.js`) and shared error handling |
| `src/store` | MobX State Tree store for the signed-in user |
| `src/translations` | i18next resources |
| `src/index.css` | design tokens and base styles taken from the Figma file |

React 18, React Router 6, MobX State Tree, Recharts, react-hook-form, Create React App.

## Running

```bash
npm install --legacy-peer-deps
npm start                       # http://localhost:3000
```

The panel expects the backend at `http://localhost:8080`; see
[ty_yak_be](https://github.com/konstde00/ty_yak_be) for how to start it.

## License

Apache-2.0. See [LICENSE](LICENSE).

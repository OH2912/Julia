# Cordially-Demo-Nachbau

Dies ist eine eigenständige, statische Website im Stil der Cordially-Demo-Seite. Sie ist als saubere Nachbildung/Template umgesetzt und verwendet eigene Platzhalterbilder, damit keine geschützten Original-Assets kopiert werden.

Die frühere Intro-/Envelope-Seite ist entfernt: Die Website startet jetzt direkt mit der Hero-Seite „Jim & Pam“.

## Bilder austauschen

Lege deine eigenen Bilder in den Ordner `bilder/` und ersetze die vorhandenen Dateien mit denselben Dateinamen:

- `hero.jpg` – großes Startbild
- `campus.jpg`
- `coffee.jpg`
- `start.jpg`
- `city.jpg`
- `weekends.jpg`
- `ritual.jpg`
- `getaway.jpg`
- `yes.jpg`
- `celebrating.jpg`
- `venue.jpg`
- `party.jpg`
- `travel.jpg`
- `registry.jpg`
- `dress.jpg`
- `menu.jpg`
- `music.jpg`
- `closing.jpg`

Tipp: Nutze möglichst Querformatbilder für `hero.jpg`, `venue.jpg` und `closing.jpg`. Die Detailkarten funktionieren auch mit Hochformat/Quadrat.

## Starten

Öffne `index.html` direkt im Browser oder lade den gesamten Ordner auf deinen Webspace hoch.

## Inhalte ändern

Texte, Datum, Adresse und Links findest du direkt in `index.html`. Farben und Layout liegen in `assets/style.css`. Interaktionen wie Countdown, RSVP-Modal und FAQ-Akkordeon liegen in `assets/script.js`.

## RSVP-Formular

Das Formular ist statisch: Es speichert Antworten lokal im Browser und kann eine CSV-Datei herunterladen. Für echtes Versenden brauchst du später ein Backend, Google Forms, Formspree, Netlify Forms oder einen ähnlichen Dienst.

## Zähler „Tage zusammen"

Der Abschnitt `#when` ist jetzt kein Countdown mehr. Er zeigt automatisch an, wie viele volle Tage seit dem 19. Juni 2024 vergangen sind.

Ändern kannst du das Startdatum in `index.html` hier:

```html
<div class="days-counter" data-together-date="2024-06-19">
```

Bitte das Datum im Format `YYYY-MM-DD` lassen.

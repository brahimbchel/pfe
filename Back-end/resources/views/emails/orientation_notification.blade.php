<!DOCTYPE html>
<html>
<head>
    <title>Nouvelle Orientation</title>
</head>
<body>
    <h1>Bonjour {{ $employe->utilisateur->nom }},</h1>
    <p>Vous avez été orienté par Dr. {{ $medecin->utilisateur->nom }} vers un médecin spécialisé en {{ $specialite }} pour : {{ $motif }}.</p>
    <p>Une visite pourra être planifiée ultérieurement.</p>
    <p>Merci.</p>
</body>
</html>
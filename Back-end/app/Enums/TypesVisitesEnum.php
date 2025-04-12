<?php

namespace App\Enums;

final class TypesVisitesEnum
{
     const ADMISSION = 'Admission';
     const PERIODIQUE = 'Periodique';
     const SPONTANE = 'Spontané';
     const REPRISE = 'Reprise';
     const CONTROLE = 'Contrôle';
     const ACCIDENT_DE_TRAVAIL = 'AccidentDeTravail';
     const CONTRE_VISITE = 'ContreVisite';
     const REINTEGRATION = 'Réintégration';
                
    public static function getValues()
    {
    return [
        self::ADMISSION,
        self::PERIODIQUE,
        self::SPONTANE,
        self::REPRISE,
        self::CONTROLE,
        self::ACCIDENT_DE_TRAVAIL,
        self::CONTRE_VISITE,
        self::REINTEGRATION,
    ];
      }
}
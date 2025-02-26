/**
 * @title 基础用法
 * @description: ConfigProvider
 */
import React from 'react'
import { ConfigProvider, Empty } from '@tinper/m';
import './demo.less';

const fr1= {
  locale: 'fr-fr',
  Common: {
    confirm: 'Confirmation',
    cancel: 'Annulation',
    loading: 'En chargement',
    close: 'Fermé'
  },
  CardBox: {
    label: 'Titre',
    delete: 'Supprimer',
    fold: 'Fermer',
    more: 'Voir plus'
  },
  DateTimePicker: {
    popTitle: 'Date Heure sélection',
    placeholder: 'Veuillez sélectionner',
    clearAndReturn: 'Vider et retourner',
    week: 'Semaine',
    year: 'Année',
    month: 'Mois',
    day: 'Le jour',
    hour: 'Heures',
    minute: 'Minutes',
    second: 'Deuxième'
  },
  Empty: {
    noData: 'Pas de données',
    noCollect: 'Pas encore de favoris',
    noResult: 'Aucun résultat de recherche pour l\'instant'
  },
  FormItemWrapper: {
    confirmText: 'Je le vois',
    errorText: 'Erreur dans le remplissage des informations! veuillez les remplir à nouveau'
  },
  Input: { label: 'Boîte de texte' },
  NavBar: { title: 'Titre' },
  Radio: {
    selected: 'Sélectionné',
    selectAll: 'Tout sélectionner',
    data: 'Article',
    reset: 'réinitialiser'
  },
  Search: { placeholder: 'Entrez pour rechercher', },
  TimePicker: {
    popTitle: 'Date Heure sélection',
    placeholder: 'Veuillez sélectionner',
    clearAndReturn: 'Vider et retourner',
    hour: 'Heures',
    minute: 'Minutes',
    second: 'Deuxième',
    am: 'Le matin',
    pm: 'Après midi'
  },
  DatePicker: {
    AM: 'Le matin',
    PM: 'Après midi'
  },
  TimeRangePicker: {
    popTitle: 'Plage de dates - heures',
    placeholder: 'Commencer-La fin',
    clearAndReturn: 'Vider et retourner',
    year: 'Année',
    month: 'Mois',
    day: 'Le jour',
    hour: 'Heures',
    minute: 'Minutes',
    to: 'à'
  },
  Calendar: {
    title: 'Sélection des dates',
    confirm: 'Confirmatio',
    start: 'Commencer',
    end: 'La fin',
    today: 'Aujourd\'hui',
    markItems: ['un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'jour'],
    yearAndMonth: '${year}Année${month}Mois'
  },
  Modal: {
    ok: 'Je le vois',
    confirm: 'Confirmatio',
    cancel: 'Annulation'
  },
  Mask: { name: 'Couche de fond' },
  Cascader: { placeholder: 'Veuillez sélectionner' },
  Dialog: { ok: 'Je le vois' },
}

const Demo = () => {
  ConfigProvider.registerLang('fr-fr', fr1)

  return (
    <div style={{ height: '100%' }}>
      <h3>中文</h3>
      <ConfigProvider locale='zh-CN'>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_1'/>
      </ConfigProvider>
      <h3>英文</h3>
      <ConfigProvider locale='en-US'>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_2'/>
      </ConfigProvider>
      <h3>繁体中文</h3>
      <ConfigProvider locale='zh-TW'>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_3'/>
      </ConfigProvider>
      <h3>法语</h3>
      <ConfigProvider locale='fr-fr'>
        <Empty style={{ background: 'var(--mui-color-background)', height: '4rem' }} fieldid='empty_4'/>
      </ConfigProvider>
    </div>
  )
}

export default Demo;

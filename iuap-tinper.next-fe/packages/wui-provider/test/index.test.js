/** index.tsx */
import { mount, shallow } from '../../../next-ui-library/test/common/mount'
import React from 'react';
import { prefix } from '../../wui-core/src/updatePrefix';
import ConfigProvider, { globalConfig } from '../src/index';
import Demo1 from './testProvider';
import TLocale from './testLocale';
import TAntd from './testAntd';
import Demo4 from './testTheme';
import enUs from './__mocks__/i18n/en-us';
import zhCn from './__mocks__/i18n/zh-cn';
import zhTw from './__mocks__/i18n/zh-tw';
import idId from './__mocks__/i18n/id-id';
import { render, screen, fireEvent } from '@testing-library/react';
import DisabledDemo from '../demo/demo-other/Demo8';
import CommonDemo from '../demo/demo-other/Demo12';
import GetThemeContainerDemo from '../demo/demo-dev/Demo1';
import { getTheme2Style } from "../../wui-provider/src/cssVariables";
import Calendar from '../../wui-calendar/src';
import { jest } from '@jest/globals';
import staticLocalMap from '../src/locale';
const fr = {
    "UID:P_TINPERNEXT-FE_184FD33005600017": "Aujourd'hui",
    "UID:P_TINPERNEXT-FE_184FD33005600018": "En ce moment",
    "UID:P_TINPERNEXT-FE_184FD33005600019": "Retour aujourd'hui",
    "UID:P_TINPERNEXT-FE_184FD3300560001A": "Déterminer",
    "UID:P_TINPERNEXT-FE_184FD3300560001B": "Choisissez l'heure",
    "UID:P_TINPERNEXT-FE_184FD3300560001C": "Choisissez une date",
    "UID:P_TINPERNEXT-FE_184FD3300560001D": "Choisir une semaine",
    "UID:P_TINPERNEXT-FE_184FD3300560001E": "Effacer",
    "UID:P_TINPERNEXT-FE_184FD3300560001F": "Mois",
    "UID:P_TINPERNEXT-FE_184FD33005600020": "Année",
    "UID:P_TINPERNEXT-FE_184FD33005600021": "Mois dernier (touche haut de la page)",
    "UID:P_TINPERNEXT-FE_184FD33005600022": "Le mois prochain (touche bas de page)",
    "UID:P_TINPERNEXT-FE_184FD33005600023": "Choisir un mois",
    "UID:P_TINPERNEXT-FE_184FD33005600024": "Choisir une année",
    "UID:P_TINPERNEXT-FE_184FD33005600025": "Choisir une année",
    "UID:P_TINPERNEXT-FE_184FD33005600026": "Année yyyy",
    "UID:P_TINPERNEXT-FE_184FD33005600027": "Le jour d",
    "UID:P_TINPERNEXT-FE_184FD33005600028": "Jyyy année m jour J",
    "UID:P_TINPERNEXT-FE_184FD33005600029": "Mm minutes ss secondes à HH le jour J de l'année YYY",
    "UID:P_TINPERNEXT-FE_184FD3300560002A": "Année précédente (touche Control plus gauche)",
    "UID:P_TINPERNEXT-FE_184FD3300560002B": "L'année suivante (touche contrôle plus touche droite)",
    "UID:P_TINPERNEXT-FE_184FD3300560002C": "Années précédentes",
    "UID:P_TINPERNEXT-FE_184FD3300560002D": "Années suivantes",
    "UID:P_TINPERNEXT-FE_184FD3300560002E": "Le siècle précédent",
    "UID:P_TINPERNEXT-FE_184FD3300560002F": "Le siècle suivant",
    "UID:P_TINPERNEXT-FE_184FD33005600030": "Cliquez ici pour sélectionner une colonne",
    "UID:P_TINPERNEXT-FE_184FD33005600031": "Cliquez ici pour sélectionner",
    "UID:P_TINPERNEXT-FE_184FD33005600032": "Jour",
    "UID:P_TINPERNEXT-FE_184FD33005600033": "Le jour précédent",
    "UID:P_TINPERNEXT-FE_184FD33005600034": "Le jour suivant",
    "UID:P_TINPERNEXT-FE_184FD33005600035": "Le mois dernier",
    "UID:P_TINPERNEXT-FE_184FD33005600036": "Le mois prochain",
    "UID:P_TINPERNEXT-FE_184FD33005600037": "Toute la journée",
    "UID:P_TINPERNEXT-FE_184FD33005600038": "Janvier__Février__Mars__Avril__Mai__Juin__Juillet__Août__Septembre__Octobre__Novembre__Décembre",
    "UID:P_TINPERNEXT-FE_184FD33005600039": "Janvier__Février__Mars__Avril__Mai__Juin__Juillet__Août__Septembre__Octobre__Novembre__Décembre",
    "UID:P_TINPERNEXT-FE_184FD3300560003A": "Jour__Un__II.__Trois__Quatre__Cinq__Six",
    "UID:P_TINPERNEXT-FE_184FD3300560003B": "Dim__Lun__Mar__Mer__Jeu__Ven__Sam",
    "UID:P_TINPERNEXT-FE_184FD3300560003C": "1 jour",
    "UID:P_TINPERNEXT-FE_184FD3300560003D": "Copier",
    "UID:P_TINPERNEXT-FE_184FD3300560003E": "Couper",
    "UID:P_TINPERNEXT-FE_184FD3300560003F": "A été copié",
    "UID:P_TINPERNEXT-FE_184FD33005600040": "A été coupé",
    "UID:P_TINPERNEXT-FE_184FD33005600041": "Copier sur la planche de cisaillement",
    "UID:P_TINPERNEXT-FE_184FD33005600042": "Fermé",
    "UID:P_TINPERNEXT-FE_184FD33005600043": "La valeur ne peut pas être supérieure au maximum",
    "UID:P_TINPERNEXT-FE_184FD33005600044": "La valeur ne doit pas être inférieure au minimum",
    "UID:P_TINPERNEXT-FE_184FD33005600045": "Dans le chargement...",
    "UID:P_TINPERNEXT-FE_184FD33005600046": "Pas de données pour le moment",
    "UID:P_TINPERNEXT-FE_184FD33005600047": "Pas de données pour le moment oh ~",
    "UID:P_TINPERNEXT-FE_184FD33005600048": "Pas de collection pour le moment oh ~",
    "UID:P_TINPERNEXT-FE_184FD33005600049": "Pas de recherche pour le moment oh ~",
    "UID:P_TINPERNEXT-FE_184FD3300560004A": "Pas de réseau pour le moment.",
    "UID:P_TINPERNEXT-FE_184FD3300560004B": "Savoir.",
    "UID:P_TINPERNEXT-FE_184FD3300560004C": "Annulation",
    "UID:P_TINPERNEXT-FE_184FD3300560004D": "Titre",
    "UID:P_TINPERNEXT-FE_184FD3300560004E": "Plus",
    "UID:P_TINPERNEXT-FE_184FD3300560004F": "Veuillez sélectionner",
    "UID:P_TINPERNEXT-FE_184FD33005600050": "Liste optionnelle",
    "UID:P_TINPERNEXT-FE_184FD33005600051": "Liste sélectionnée",
    "UID:P_TINPERNEXT-FE_184FD33005600052": "Rechercher",
    "UID:P_TINPERNEXT-FE_184FD33005600053": "Restaurer les paramètres",
    "UID:P_TINPERNEXT-FE_184FD33005600054": "Contient",
    "UID:P_TINPERNEXT-FE_184FD33005600055": "Ne contient pas",
    "UID:P_TINPERNEXT-FE_184FD33005600056": "égale à",
    "UID:P_TINPERNEXT-FE_184FD33005600057": "Pas égale à",
    "UID:P_TINPERNEXT-FE_184FD33005600058": "Pour commencer",
    "UID:P_TINPERNEXT-FE_184FD33005600059": "Avec la fin",
    "UID:P_TINPERNEXT-FE_184FD3300560005A": "Supérieure à",
    "UID:P_TINPERNEXT-FE_184FD3300560005B": "Supérieur ou égal à",
    "UID:P_TINPERNEXT-FE_184FD3300560005C": "Moins que",
    "UID:P_TINPERNEXT-FE_184FD3300560005D": "Inférieur ou égal à",
    "UID:P_TINPERNEXT-FE_184FD3300560005E": "Oui",
    "UID:P_TINPERNEXT-FE_184FD3300560005F": "Non",
    "UID:P_TINPERNEXT-FE_18883F1A05600002": "Total",
    "UID:P_TINPERNEXT-FE_184FD33005600061": "Numéro de série",
    "UID:P_TINPERNEXT-FE_184FD33005600062": "Tous",
    "UID:P_TINPERNEXT-FE_184FD33005600063": "Aucune ligne correspondante n'a été trouvée!",
    "UID:P_TINPERNEXT-FE_184FD33005600064": "Déjà la première ligne correspondant!",
    "UID:P_TINPERNEXT-FE_184FD33005600065": "Déjà la dernière ligne correspondant!",
    "UID:P_TINPERNEXT-FE_184FD33005600066": "Déploiement par lots",
    "UID:P_TINPERNEXT-FE_184FD33005600067": "Lot de clôture",
    "UID:P_TINPERNEXT-FE_184FD33005600068": "Cliquez sur ordre croissant",
    "UID:P_TINPERNEXT-FE_184FD33005600069": "Cliquez sur ordre décroissant",
    "UID:P_TINPERNEXT-FE_184FD3300560006A": "Cliquez sur Annuler le tri",
    "UID:P_TINPERNEXT-FE_184FD3300560006B": "Sélectionner tout",
    "UID:P_TINPERNEXT-FE_184FD3300560006C": "Contre - sélection de la page",
    "UID:P_TINPERNEXT-FE_184FD3300560006D": "Vider tout",
    "UID:P_TINPERNEXT-FE_184FD3300560006E": "Valeur vide",
    "UID:P_TINPERNEXT-FE_184FD3300560006F": "Premier semestre",
    "UID:P_TINPERNEXT-FE_184FD33005600070": "Deuxième semestre",
    "UID:P_TINPERNEXT-FE_1853593C05380004": "Trimestre",
    "UID:P_TINPERNEXT-FE_184FD33005600072": "Année précédente",
    "UID:P_TINPERNEXT-FE_184FD33005600073": "Année suivante",
    "UID:P_TINPERNEXT-FE_184FD33005600074": "Au total",
    "UID:P_TINPERNEXT-FE_184FD33005600075": "Article",
    "UID:P_TINPERNEXT-FE_184FD33005600076": "Afficher",
    "UID:P_TINPERNEXT-FE_184FD33005600077": "Sauter à",
    "UID:P_TINPERNEXT-FE_184FD33005600078": "Pages",
    "UID:P_TINPERNEXT-FE_184FD33005600079": "Page précédente",
    "UID:P_TINPERNEXT-FE_184FD3300560007A": "Page suivante",
    "UID:P_TINPERNEXT-FE_184FD3300560007B": "Retour à la page d'accueil",
    "UID:P_TINPERNEXT-FE_184FD3300560007C": "Passer à la page de fin",
    "UID:P_TINPERNEXT-FE_184FD3300560007D": "Supprimer un fichier",
    "UID:P_TINPERNEXT-FE_184FD3300560007E": "Télécharger le fichier",
    "UID:P_TINPERNEXT-FE_184FD3300560007F": "Dans le fichier upload",
    "UID:P_TINPERNEXT-FE_184FD33005600080": "Voir la grande image",
    "UID:P_TINPERNEXT-FE_184FD33005600081": "Aperçu de la grande image",
    "UID:P_TINPERNEXT-FE_1850721405900004": "404",
    "UID:P_TINPERNEXT-FE_1875A9F605600005": "janFirst",
    "UID:P_TINPERNEXT-FE_1875AA2A05600005": "febFirst",
    "UID:P_TINPERNEXT-FE_1875AA5405600008": "marFirst",
    "UID:P_TINPERNEXT-FE_1875AA9205B00004": "aprFirst",
    "UID:P_TINPERNEXT-FE_1875AAE005600000": "mayFirst",
    "UID:P_TINPERNEXT-FE_1875AB1E05B00009": "junFirst",
    "UID:P_TINPERNEXT-FE_1875AC7805B00003": "julFirst",
    "UID:P_TINPERNEXT-FE_1875AB9E05600003": "augFirst",
    "UID:P_TINPERNEXT-FE_1875ABBA05B00009": "sepFirst",
    "UID:P_TINPERNEXT-FE_1875ABE405B00001": "octFirst",
    "UID:P_TINPERNEXT-FE_1875AC0E05600006": "novFirst",
    "UID:P_TINPERNEXT-FE_1875AC2E05B00004": "decFirst",
}
jest.mock('../src/locale');
staticLocalMap['en-us'].mockResolvedValue(enUs)
staticLocalMap['zh-cn'].mockResolvedValue(zhCn)
staticLocalMap['zh-tw'].mockResolvedValue(zhTw)
staticLocalMap['id-id'].mockResolvedValue(idId)
describe('component: Provider, <test prop:: config>', () => {
    it('should init showing English and it should be toggled', async () => {
        let wrapper = mount(<Demo1 />);
        wrapper.debug()
        expect(wrapper.find(`.${prefix}-pagination .page_jump span`).at(0).text()).toContain('Goto');
        wrapper.find(`.${prefix}-radio-group .${prefix}-radio-button`).at(0).simulate('click');
        wrapper.find(`.${prefix}-radio-group .${prefix}-radio-button`).at(0).find('input').simulate('click');
        expect(wrapper.find(`.${prefix}-pagination .page_jump span`).at(0).text()).toContain('跳至');
        wrapper.unmount()

    });
    // it('component: Provider, <test prop:: componentSize>', () => {
    //     ["sm", "md", "lg"].forEach(_ => {
    //         let wrapper = mount(<Demo1 componentSize={_} />);
    //         expect(wrapper.find(`.${prefix}-input-number-out`).at(0).hasClass(`${prefix}-input-number-out-${_}`)).toBeTruthy();
    //         wrapper.unmount()
    //     })
    // });
});
describe('component: Provider, <test prop:: globalConfig>', () => {
    it('test getPrefixCls', () => {
        const returnV1 = globalConfig().getPrefixCls('aaa', 'bbb');
        expect(returnV1).toBe('bbb');
        const returnV2 = globalConfig().getPrefixCls('aaa');
        expect(returnV2).toBe('wui-aaa');
        const returnV3 = globalConfig().getPrefixCls();
        expect(returnV3).toBe('wui');
    });
    it('test getRootPrefixCls', () => {
        const returnV1 = globalConfig().getRootPrefixCls('aaa', 'bbb');
        expect(returnV1).toBe('aaa');
        const returnV3 = globalConfig().getRootPrefixCls(undefined, 'aaa-');
        expect(returnV3).toBe('aaa');
        const returnV4 = globalConfig().getRootPrefixCls(undefined, 'aaa');
        expect(returnV4).toBe('wui');
        mount(<Demo1 prefixCls="ccc" />);
        const returnV2 = globalConfig().getRootPrefixCls(undefined, 'aaa');
        expect(returnV2).toBe('ccc');
    });
});
describe('component: Provider, <test prop:: theme>', () => {
    it('should init showing English and it should be toggled', () => {
        let wrapper = mount(
            <Demo4 />
        );
        wrapper.find(`.${prefix}-radio-group .${prefix}-radio-button`).at(2).find('input').simulate('click');
        expect(wrapper.find('#built-in-config').props().style['--wui-primary-color-light']).toBe('rgba(42, 130, 255, 0.1)');
    });
});
describe('component: Provider,  <test prop:: getTheme2Style>', () => {
    it('should init showing English and it should be toggled', () => {
        const style = getTheme2Style('blue')
        expect(style['--wui-base-item-color-active']).toBe('#2A82FF');
    });
});
describe('component: Provider, <test prop:: locale>', () => {
    it('should init showing English and it should be toggled', () => {
        let wrapper = mount(
            <TLocale />
        );
        // 此处 可填写更多的 断言
        expect(wrapper.find('.wui-pagination-total').text()).toContain('Total');
    });
});
describe('component: Provider, <test prop:: antd>', () => {
    it('should init showing English and it should be toggled', () => {
        let testA = '';
        let testB = '';
        const mocEvent = (a, b) => { testA = a; testB = b; };
        let wrapper = mount(
            <TAntd changeEvent={mocEvent} />
        );
        // 此处 可填写更多的 断言
        wrapper.find('.demo-checkbox .wui-checkbox input').simulate('click')
        expect(testA).toBe(true)
        wrapper.find('.wui-switch').at(0).simulate('click')
        wrapper.find('.wui-checkbox input').simulate('click')
        expect(testB).toBe(false)

    });
});
describe('component: Provider, <test prop:: getThemeContainer>', () => {
    it('should init showing English and it should be toggled', () => {
        let { container, debug } = render(
            <GetThemeContainerDemo />
        );
        fireEvent.click(container.querySelectorAll('.wui-radio-button')[2])
        expect(container.querySelector("#built-in-config").getAttribute('style').includes
            ('--wui-primary-color: #2A82FF; --wui-primary-color-hover: #2271E1; --wui-primary-color-active: #2271E1; --wui-primary-color-light: rgba(42, 130, 255, 0.1); --wui-base-item-color-active: #2A82FF; --wui-picker-cell-bg-color-hover: rgba(42, 130, 255, 0.1); --wui-picker-cell-bg-color-selected: rgba(42, 130, 255, 0.1);')).toBe(true)

    });

});
describe('component: Provider, <test prop:: componentDisabled>', () => {
    it('should init disabled and it should be toggled', () => {
        let { container, debug } = render(
            <DisabledDemo />
        );
        expect(container.querySelector('.wui-pagination').className.includes('wui-pagination-disabled')).toBe(false)
        expect(container.querySelector('.wui-button').getAttribute('disabled')).toBe(null)
        expect(container.querySelector('.wui-input-number input').getAttribute('disabled')).toBe(null)
        expect(container.querySelector('.wui-select-selector input').getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[0].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[1].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[2].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[3].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[4].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[5].getAttribute('disabled')).toBe(null)
        // wui-pagination wui-pagination-disabled
        fireEvent.click(container.querySelector('.wui-radio-button'))
        expect(container.querySelector('.wui-pagination').className.includes('wui-pagination-disabled')).toBe(true)
        expect(container.querySelector('.wui-button').disabled).toBe(true)
        expect(container.querySelector('.wui-input-number input').disabled).toBe(true)
        expect(container.querySelector('.wui-select-selector input').disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[0].disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[1].disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[2].disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[3].disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[4].disabled).toBe(true)
        expect(container.querySelectorAll('.wui-picker input')[5].disabled).toBe(true)
        fireEvent.click(container.querySelectorAll('.wui-radio-button')[1])
        expect(container.querySelector('.wui-pagination').className.includes('wui-pagination-disabled')).toBe(false)
        expect(container.querySelector('.wui-button').getAttribute('disabled')).toBe(null)
        expect(container.querySelector('.wui-input-number input').getAttribute('disabled')).toBe(null)
        expect(container.querySelector('.wui-select-selector input').getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[0].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[1].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[2].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[3].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[4].getAttribute('disabled')).toBe(null)
        expect(container.querySelectorAll('.wui-picker input')[5].getAttribute('disabled')).toBe(null)

    });
});
describe('component: Provider, <test prop:: align>,<test prop:: bordered>,>,<test prop:: disabled>', () => {
    it('should init align right and it should be toggled', () => {
        let { container, debug } = render(
            <CommonDemo />
        );
        expect(container.querySelector('.wui-select').className.includes('wui-select-align-right')).toBe(true)
        fireEvent.click(container.querySelectorAll('.custom-align .wui-radio-button')[1])
        expect(container.querySelector('.wui-select').className.includes('wui-select-align-center')).toBe(true)
        fireEvent.click(container.querySelectorAll('.custom-align .wui-radio-button')[0])
        expect(container.querySelector('.wui-select').className.includes('wui-select-align-left')).toBe(true)
    });
    it('should init border bottom and it should be toggled', () => {
        let { container, debug } = render(
            <CommonDemo />
        );
        expect(container.querySelector('.wui-select').className.includes('wui-select-border-bottom')).toBe(true)
        fireEvent.click(container.querySelectorAll('.custom-border .wui-radio-button')[1])
        expect(container.querySelector('.wui-select').className.includes('wui-select-border-bottom')).toBe(false)
        fireEvent.click(container.querySelectorAll('.custom-border .wui-radio-button')[2])
        expect(container.querySelector('.wui-select').className.includes('wui-select-border-no')).toBe(true)
    });
    it('should disbled and it should be toggled', () => {
        let { container, debug } = render(
            <CommonDemo />
        );
        expect(container.querySelector('.wui-select').className.includes('wui-select-disabled')).toBe(false)
        fireEvent.click(container.querySelectorAll('.custom-disbled .wui-radio-button')[0])
        expect(container.querySelector('.wui-select').className.includes('wui-select-disabled')).toBe(true)
    });
});
describe('component: Provider, test custom locale', () => {
    expect(ConfigProvider.hasRegisterLang('fr-fr')).toBeFalsy();
    ConfigProvider.registerLang('fr-fr', fr);
    expect(ConfigProvider.hasRegisterLang('fr-fr')).toBeTruthy();

})
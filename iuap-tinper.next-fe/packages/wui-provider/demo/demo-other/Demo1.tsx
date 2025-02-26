/**
 *
 * @title 全局配置locale 支持非内置语言配置
 * @description 非内置语言配置：注册语言、实现自定义语言
 *
 */

import {
    Button,
    ConfigProvider,
    DatePicker,
    InputNumber,
    Modal,
    Pagination,
    Popconfirm,
    Radio,
    Row,
    TimePicker,
    Empty,
    Steps,
    Calendar,
    ErrorMessage
} from "@tinper/next-ui";
import React, { Component } from 'react';
import moment, { Moment } from "moment";
import Demo12 from "../../../wui-modal/demo/demo-bip/Demo12";
// import { fr1 } from "../../../wui-locale/src/local.map";

const { MonthPicker, RangePicker, YearPicker, WeekPicker } = DatePicker;
const { Step } = Steps;

interface ProviderState {
	locale: string;
	rangeValue: any;
	showModal: boolean;
	activePage: number;
	arrowCrt: number;
	number: number;
}
const fr1 =
{
    locale: 'fr',
    calendar: {
        'today': 'Aujourd\'hui',
        'now': 'Maintenant',
        'backToToday': 'Aujourd\'hui',
        'ok': 'Ok',
        'clear': 'Rétablir',
        'month': 'Mois',
        'year': 'Année',
        'timeSelect': 'Sélectionner l\'heure',
        'dateSelect': 'Sélectionner la date',
        'monthSelect': 'Choisissez un mois',
        'yearSelect': 'Choisissez une année',
        'decadeSelect': 'Choisissez une décennie',
        'yearFormat': 'YYYY',
        'dateFormat': 'DD/MM/YYYY',
        'dayFormat': 'DD',
        'dateTimeFormat': 'DD/MM/YYYY HH:mm:ss',
        'monthBeforeYear': 'true',
        'previousMonth': 'Mois précédent (PageUp)',
        'nextMonth': 'Mois suivant (PageDown)',
        'previousYear': 'Année précédente (Ctrl + gauche)',
        'nextYear': 'Année prochaine (Ctrl + droite)',
        'previousDecade': 'Décennie précédente',
        'nextDecade': 'Décennie suivante',
        'previousCentury': 'Siècle précédent',
        'nextCentury': 'Siècle suivant',
        'clickSelectColomn': "Cliquez ici pour sélectionner une colonne",
        'clickSelect': "Cliquez ici pour sélectionner",
        'date': "Jour",
        'toToday': "Aujourd‘hui",
        'toLastDay': "Le jour précédent",
        'toNextDay': "Le jour suivant",
        'toLastMonth': "Le mois dernier",
        'toNextMonth': "Le mois prochain",
        'allDay': "Toute la journée",
        'weekSelect': "Choisir une semaine",
        months: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
        monthsShort: ['tháng 01', 'tháng 02', 'tháng 03', 'tháng 04', 'tháng 05', 'tháng 06', 'tháng 07', 'tháng 08', 'tháng 09', 'tháng 10', 'tháng 11', 'tháng 12'],
        weekdaysMin: ['CN', 'thá2', 'thá3', 'thá4', 'thá5', 'thá6', 'thá7'],
        weekdaysShort: ['CN', 'thá2', 'thá3', 'thá4', 'thá5', 'thá6', 'thá7'],
        janFirst: 'Jan 1',
        febFirst: 'Feb 1',
        marFirst: 'Mar 1',
        aprFirst: 'Apr 1',
        mayFirst: 'Mei 1',
        junFirst: 'Jun 1',
        julFirst: 'Jul 1',
        augFirst: 'Agu 1',
        sepFirst: 'Sep 1',
        octFirst: 'Okt 1',
        novFirst: 'Nov 1',
        decFirst: 'Des 1',

    },
    clipboard: {
        'copy': 'Copier',
        'cut': 'Couper',
        'copyReady': 'A été copié',
        'cutReady': 'A été coupé',
        'copyToClipboard': 'Copier sur la planche de cisaillement',
        'close': 'Fermé',
    },
    inputNumber: {
        'msgMax': 'La valeur ne peut pas être supérieure au maximum',
        'msgMin': 'La valeur ne doit pas être inférieure au minimum',
    },
    spin: {
        'loading': 'Dans le chargement...',
    },
    treeSelect: {
        'notFoundContent': 'Không có dữ liệu'
    },
    empty: {
        'noFound': '404',
        'noVisualizeDataImg': 'Pas de données pour le moment oh~',
        'noCollectImg': 'Pas de collection pour le moment~',
        'noDataImg': 'Pas de données pour le moment oh~',
        'noSearchImg': 'Pas de recherche pour le moment oh~',
        'noNetworkImg': 'Pas de réseau pour le moment~',
    },
    modal: {
        'ok': 'Déterminer',
        'gotit': 'Savoir',
        'cancel': 'Annulation',
        'title': 'Titre',
    },
    steps: {
        'text': 'Plus',
    },
    select: {
        'notFoundContent': 'Pas de données pour le moment'
    },
    cascader: {
        'placeholder': 'Veuillez sélectionner'

    },
    transfer: {
        'notFoundContent': '暂无数据',
        'source': '可选列表',
        'target': '已选列表',
        'searchPlaceholder': '搜索',
    },
    table: {
        'resetSettings': 'Restaurer les paramètres',
        'include': 'Contient',
        'exclusive': 'Ne contient pas',
        'equal': 'égale à',
        'unequal': 'Pas égale à',

        'end': 'Avec la fin',
        'greaterThan': 'Supérieure à',
        'greatThanEqualTo': 'Supérieur ou égal à',
        'lessThan': 'Moins que',
        'lessThanEqualTo': 'Inférieur ou égal à',
        'beEqualTo': 'égale à',
        'notEqualTo': 'Pas égale à',
        "noData": 'Pas de données pour le moment',
        "boolTrue": "是",
        "boolFalse": "否",
        "total": "合计",
        'ok': 'Déterminer',
        'cancel': 'Annulation',
        'showRowNum': 'Numéro de série',
        'all': 'Tous',
        'searchNoRow': 'Aucune ligne correspondante n‘a été trouvée!',
        'alreadyFirstRow': 'Déjà la première ligne correspondant!',
        'alreadyLastRow': 'Déjà la dernière ligne correspondant!',
        'expandAll': 'Déploiement par lots',
        'collapseAll': 'Lot de clôture',
        'overlayUpText': 'Cliquez sur ordre croissant',
        'overlayDownText': 'Cliquez sur ordre décroissant',
        'cancelOverlay': 'Cliquez sur Annuler le tri',
        'selectAll': 'Sélectionner tout',
        'invertCurrentPage': 'Contre - sélection de la page',
        'clearAll': 'Vider tout',
    },
    datePicker: {
        'today': 'Aujourd‘hui',
        'now': 'En ce moment',
        'backToToday': 'Retour aujourd’hui',
        'ok': 'Déterminer',
        'timeSelect': 'Choisissez l‘heure',
        'dateSelect': 'Choisissez une date',
        'weekSelect': 'Choisir une semaine',
        'clear': 'Effacer',
        'month': 'Mois',
        'year': 'Année',
        'previousMonth': 'Le mois dernier',
        'nextMonth': 'Le mois prochain',
        'monthSelect': 'Choisir un mois',
        'yearSelect': 'Choisir une année',
        'decadeSelect': 'Choisir une année',
        'firstHalfYear': 'Premier semestre',
        'secondHalfYear': 'Deuxième semestre',
        'yearFormat': 'Année yyyy',
        'quarterFormat': 'Q trimestre',
        'quarter': 'trimestre',
        'dayFormat': 'Le jour d',
        'dateFormat': 'Jyyy année m jour J',
        'dateTimeFormat': 'Mm minutes ss secondes à HH le jour J de l’année YYY',
        'previousYear': 'Année précédente',
        'nextYear': 'Année suivante',
        'previousDecade': 'Années précédentes',
        'nextDecade': 'Années suivantes',
        'previousCentury': 'Le siècle précédent',
        'nextCentury': 'Le siècle suivant',
        months: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'],
        monthsShort: ['tháng 01', 'tháng 02', 'tháng 03', 'tháng 04', 'tháng 05', 'tháng 06', 'tháng 07', 'tháng 08', 'tháng 09', 'tháng 10', 'tháng 11', 'tháng 12'],
        weekdaysMin: ['CN', 'thá2', 'thá3', 'thá4', 'thá5', 'thá6', 'thá7'],
        weekdaysShort: ['CN', 'thá2', 'thá3', 'thá4', 'thá5', 'thá6', 'thá7'],
    },
    timePicker: {
        'ok': 'Déterminer',
        'now': 'En ce moment',
        'clear': 'Effacer',
    },
    popconfirm: {
        'ok': 'Déterminer',
        'cancel': 'Annulation',
    },
    pagination: {
        'total': 'Au total',
        'items': 'Article',
        'show': 'Afficher',
        'goto': 'Sauter à',
        'page': 'Pages',
        'ok': 'Déterminer',
        'prev': 'Page précédente',
        'next': 'Page suivante',
        'first': 'Retour à la page d’accueil',
        'last': 'Passer à la page de fin',
    },
    upload: {
        'remove': 'Supprimer un fichier',
        'down': 'Télécharger le fichier',
        'fileLoading': 'Dans le fichier upload',
        'toview': 'Voir la grande image',
        'preview': 'Aperçu de la grande image',
    },

}
class Demo1 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            locale: "en-us",
            rangeValue: [],
            showModal: false,
            activePage: 1,
            arrowCrt: 10,
            number: 0
        }
        // ConfigProvider.registerLang?.("fr-fr", fr1)
        const hasRegisterLang = ConfigProvider.hasRegisterLang('fr-fr');
	    if (!hasRegisterLang) {
	        // ConfigProvider.registerLang?.('fr-fr', fr1)
	        ConfigProvider.registerLang?.('fr-fr', fr1)

	    }
        ConfigProvider.config({ locale: 'zh-cn' })

    }

	handleLocaleChange = (value: string) => {
	    console.log(value);
	    ConfigProvider.config({ locale: value })


	    const hasRegisterLang = ConfigProvider.hasRegisterLang(value);
	    if (!hasRegisterLang) {
	        ConfigProvider.registerLang?.('fr-fr', fr1)

	    }
	    this.setState({
	        locale: value
	    })
	};
	handleSelect = (eventKey: number) => {
	    this.setState({
	        activePage: eventKey
	    });
	}
	change = (a1: number) => {
	    console.log('argument1', a1);
	    this.setState({ number: a1 })
	}
	onRangeChange = (d: [Moment, Moment], dateString: [string, string], dateStringArr: [string, string]) => {
	    console.warn('onRangeChange--->', d, dateString, dateStringArr)
	    this.setState({ rangeValue: d })
	}

	close = () => {
	    this.setState({
	        showModal: false
	    });
	}
	open = () => {
	    this.setState({
	        showModal: true
	    });
	}

	arrowChange = (val: number) => {
	    this.setState({
	        arrowCrt: val
	    })
	}

    handleErrorMessageClick = () => {
        ErrorMessage.destroy();
        ErrorMessage.create({ message: '这是一个异常提示', detailMsg: 'ascbasuidvcasndvonaslkndcasjndcnsd' })
    }

    render() {
	    const { locale } = this.state;
        // 异常提示多语支持provider传入，同时支持通过config全局配置
        // ErrorMessage.config({
        //     locale: this.state.locale,
        // });
	    const content = 'Do you like tinper-bee UI Components Library？';
	    return (
	        <div className="demo1" tinper-next-role={'container'} style={{ position: 'relative' }}>
	            <Radio.Group
	                selectedValue={locale}
	                onChange={this.handleLocaleChange}>
	                <Radio.Button value="zh-cn">中文</Radio.Button>
	                <Radio.Button value="en-us">英文</Radio.Button>
	                <Radio.Button value="zh-tw">繁体</Radio.Button>
	                {/* <Radio.Button value="vi-vn">越语</Radio.Button> */}
	                <Radio.Button value="id-id">印尼语</Radio.Button>
	                <Radio.Button value="fr-fr">法语</Radio.Button>
	            </Radio.Group>

	            <ConfigProvider locale={locale} >
	                <Row>
	                    <Pagination
	                        // locale={'en-us'}
	                        prev
	                        next
	                        maxButtons={5}
	                        boundaryLinks
	                        defaultActivePage={2}
	                        defaultPageSize={15}
	                        showJump={true}
	                        total={50}
	                        activePage={this.state.activePage}
	                        onSelect={this.handleSelect}
	                    />
	                </Row>
	                <Row>
	                    <InputNumber
	                        // locale={'en-us'}
	                        iconStyle="one"
	                        min={-1}
	                        max={555}
	                        value={this.state.number}
	                        onChange={this.change}
	                        displayCheckPrompt={true}
	                    />
	                </Row>

	                <Row>
	                    <Button
	                        bordered
	                        onClick={this.open}>
							打开模态框
	                    </Button>
	                    <Modal
	                        show={this.state.showModal}
	                        destroyOnClose={true}
	                        maskClosable={false}
	                        onOk={this.close}
	                        onCancel={this.close}>
	                        <Modal.Body>
	                            <p>Some contents...</p>
	                            <p>Some contents...</p>
	                            <p>Some contents...</p>
	                        </Modal.Body>
	                    </Modal>
	                </Row>

                    <Row>
                        <Button onClick={this.handleErrorMessageClick}>打开异常提示</Button>
                    </Row>

	                <Row>
	                    <Popconfirm trigger="click" placement="right" content={content}>
	                        <Button colors="primary">Click me</Button>
	                    </Popconfirm>
	                </Row>

	                <Row>
						日期：<DatePicker
	                        format="YYYY-MM-DD HH:mm:ss"
	                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
	                    />
	                </Row>
	                <Row>
						年历：<YearPicker
	                        format="YYYY"
	                        defaultValue={moment().format('YYYY')}
	                    />
	                </Row>
	                <Demo12></Demo12>
	                <Row>
						月历：<MonthPicker />
	                </Row>
	                <Row>
						周历：<WeekPicker />
	                </Row>
	                <Row>
						范围：<RangePicker
	                        showToday
	                        format="YYYY-MM"
	                        value={this.state.rangeValue}
	                        onChange={this.onRangeChange}
	                    />
	                </Row>
	                <Row>
						季度：<DatePicker
	                        picker='quarter'
	                        placeholder='选择季度'
	                    />
	                </Row>
	                <Row>
						时间：<TimePicker
	                        showSecond={false}
	                        use12Hours
	                    />
	                </Row>
	                <Row>
	                    <Empty />
	                </Row>
	                <Row>
	                    <Steps onChange={this.arrowChange} current={this.state.arrowCrt} more type="arrow">
	                        <Step title={<div>1已完成</div>} description="这是一段描述" />
	                        <Step title="2已完成" description="这是一段描述" />
	                        <Step title="3已完成" description="这是一段描述" />
	                        <Step title="4已完成" />
	                        <Step title="5已完成" disabled description="这是一段描述" />
	                        <Step title="6已完成" description="这是一段描述" />
	                        <Step title="7已完成" description="这是一段描述" />
	                        <Step title="8已完成" description="这是一段描述" />
	                        <Step title="9已完成" description="这是一段描述" />
	                        <Step title="10已完成" description="这是一段描述" />
	                        <Step title="11进行中" description="这是一段描述" />
	                        <Step title="12未开始" />
	                        <Step title="13未开始" />
	                        <Step title="14未开始" description="这是一段描述" />
	                        <Step title="15未开始" description="这是一段描述" />
	                        <Step title="16未开始" description="这是一段描述" />
	                        <Step title="17未开始" description="这是一段描述" />
	                        <Step title="18未开始" disabled description="这是一段描述" />
	                        <Step title="19未开始" description="这是一段描述" />
	                        <Step title="20未开始" description="这是一段描述" />
	                    </Steps>
	                </Row>

	                <Calendar
	                    style={{ margin: 10 }}
	                    fullscreen={false}
	                    fieldid="demo"
	                ></Calendar>
	            </ConfigProvider>
	            <Demo12></Demo12>
	        </div>
	    )
    }
}

export default Demo1;
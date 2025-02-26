/**
 * @title 基础用法
 * @description 组件示例
 */
import React from 'react'
import { Accordion } from '@tinper/m'

export default () => {
  return (
    <>
      <h3>基础用法</h3>
      <Accordion defaultActiveKey={['1']} fieldid='accordion1'>
        <Accordion.Panel key='1' title='第一项'>
          {mockContents[0]}
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          {mockContents[1]}
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          {mockContents[2]}
        </Accordion.Panel>
      </Accordion>
      <h3>手风琴模式</h3>
      <Accordion accordion fieldid='accordion2'>
        <Accordion.Panel key='1' title='第一项'>
          手风琴模式只能同时展开一个
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          手风琴模式只能同时展开一个
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          手风琴模式只能同时展开一个
        </Accordion.Panel>
      </Accordion>
      <h3>自定义左右边距</h3>
      <Accordion defaultActiveKey={['1']} fieldid='accordion1' style={{ '--title-padding-left': '30px', '--title-padding-right': '40px', '--content-padding-left': '50px', '--content-padding-right': '60px'}}>
        <Accordion.Panel key='1' title='第一项'>
          {mockContents[0]}
        </Accordion.Panel>
        <Accordion.Panel key='2' title='第二项'>
          {mockContents[1]}
        </Accordion.Panel>
        <Accordion.Panel key='3' title='第三项'>
          {mockContents[2]}
        </Accordion.Panel>
      </Accordion>
    </>
  )
}

const mockContents = [
  '豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯。',
  '时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿；临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势。披绣闼，俯雕甍，山原旷其盈视，川泽纡其骇瞩。闾阎扑地，钟鸣鼎食之家；舸舰弥津，青雀黄龙之舳。云销雨霁，彩彻区明。落霞与孤鹜齐飞，秋水共长天一色。渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。',
  '遥襟甫畅，逸兴遄飞。爽籁发而清风生，纤歌凝而白云遏。睢园绿竹，气凌彭泽之樽；邺水朱华，光照临川之笔。四美具，二难并。穷睇眄于中天，极娱游于暇日。天高地迥，觉宇宙之无穷；兴尽悲来，识盈虚之有数。望长安于日下，目吴会于云间。地势极而南溟深，天柱高而北辰远。关山难越，谁悲失路之人？萍水相逢，尽是他乡之客。怀帝阍而不见，奉宣室以何年？',
  '嗟乎！时运不齐，命途多舛。冯唐易老，李广难封。屈贾谊于长沙，非无圣主；窜梁鸿于海曲，岂乏明时？所赖君子见机，达人知命。老当益壮，宁移白首之心？穷且益坚，不坠青云之志。酌贪泉而觉爽，处涸辙以犹欢。北海虽赊，扶摇可接；东隅已逝，桑榆非晚。孟尝高洁，空余报国之情；阮籍猖狂，岂效穷途之哭！'
]

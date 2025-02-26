import React from 'react';
import warning from 'warning';
// import PropTypes from 'prop-types';
import { isVertical } from './utils';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TabBarTabsNodeProps } from './iTabs'

const defaultProps = {
    panels: [],
    clsPrefix: [],
    tabBarGutter: null,
    onTabClick: () => {
    },
    saveRef: () => {
    },
};
export default class TabBarTabsNode extends React.Component<TabBarTabsNodeProps> {
    static defaultProps = defaultProps
    constructor(props: TabBarTabsNodeProps) {
        super(props);
    }
    onTabClick(key: string) {
        this.props.onTabClick?.(key);
    }
  onDragEnd = (result: object) => { // 拖拽完成时的回调，并暴露出onDrag方法
      let { onDrag } = this.props
      if (onDrag) {
          onDrag(result)
      }
  }
  iseditable = (v: undefined | boolean) => {
      let { type } = this.props
      if (type == 'editable-card') {
          if (v === undefined || v == true) {
              return
          } else {
              return 'noClose'
          }
      }
      return
  }
  handleItems = () => {
      let {
          panels: children,
          activeKey,
          clsPrefix,
          tabBarGutter,
          saveRef,
          tabBarPosition,
          renderTabBarNode,
          dir: direction,
          dragable,
          fieldid,
          //   id,
          type,
          items
      } = this.props;
      let rst: any[] = [];
      // type为editable-card模式时不能直接使用items，内部包含关闭图标逻辑在tas层生成React.cloneElement元素，走原逻辑
      if (items && items?.length > 0 && type != 'editable-card') {
          items?.map((item, index) => {
              const key = item.key;
              let cls = activeKey === key ? `${clsPrefix}-tab-active` : '';
              cls += ` ${clsPrefix}-tab`;
              let events = {};
              if (item.disabled) {
                  cls += ` ${clsPrefix}-tab-disabled`;
              } else {
                  events = {
                      onClick: this.onTabClick.bind(this, key),
                  };
              }
              let ref: Record<string, unknown> = {};
              if (activeKey === key) {
                  ref.ref = saveRef!('activeTab');
              }

              const gutter = tabBarGutter && index === children!?.length - 1 ? 0 : tabBarGutter;

              const marginProperty = direction === 'rtl' ? 'marginLeft' : 'marginRight';
              const style = {
                  [isVertical(tabBarPosition) ? 'marginBottom' : marginProperty]: gutter,
              };
              warning('tab' in item, 'There must be `tab` property on children of Tabs.');

              let node: React.ReactNode = (dragable ?
                  <Draggable key={item.key + "_" + index} index={index} draggableId={item.key + "_" + index}>
                      {(provided: any) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={item.key + "_" + index}
                              className={cls} nodekey={key}>
                              <div
                                  role="tab"
                                  aria-disabled={item.disabled ? 'true' : 'false'}
                                  aria-selected={activeKey === key ? 'true' : 'false'}
                                  {...events}
                                  // className={cls}
                                  key={key}
                                  style={style}
                                  {...ref}
                                  nid={item.nid}
                                  uitype={item.uitype}
                                  // @ts-ignore
                                  nodekey={key}
                                  closable={this.iseditable(item.closable)}
                                  //   id={id ? id + '-tabs-area-' + index : undefined}
                                  //   fieldid={fieldid ? fieldid + '-tabs-area-' + index : undefined}
                                  id={item?.id}
                                  fieldid={item?.fieldid ? item?.fieldid : fieldid ? fieldid + '-tabs-area-' + index : undefined}
                              >
                                  {item.tab}
                              </div>
                          </div>
                      )}

                  </Draggable> : (<div
                      role="tab"
                      aria-disabled={item.disabled ? 'true' : 'false'}
                      aria-selected={activeKey === key ? 'true' : 'false'}
                      {...events}
                      className={cls}
                      key={key}
                      style={style}
                      {...ref}
                      nid={item.nid}
                      uitype={item.uitype}
                      // @ts-ignore
                      nodekey={key}
                      closable={this.iseditable(item.closable)}
                      //   id={id ? id + '-tabs-area-' + index : undefined}
                      //   fieldid={fieldid ? fieldid + '-tabs-area-' + index : undefined}
                      id={item?.id}
                      fieldid={item?.fieldid ? item?.fieldid : fieldid ? fieldid + '-tabs-area-' + index : undefined}
                  >
                      {item.tab}
                  </div>)
              );

              if (renderTabBarNode) {
                  node = renderTabBarNode(node);
              }

              rst.push(node);
          })
      } else {
          React.Children.forEach(children, (child: React.ReactElement, index) => {
              if (!child) {
                  return;
              }
              const key = child.key;
              let cls = activeKey === key ? `${clsPrefix}-tab-active` : '';
              cls += ` ${clsPrefix}-tab`;
              let events = {};
              if (child.props.disabled) {
                  cls += ` ${clsPrefix}-tab-disabled`;
              } else {
                  events = {
                      onClick: this.onTabClick.bind(this, key),
                  };
              }
              let ref: Record<string, unknown> = {};
              if (activeKey === key) {
                  ref.ref = saveRef!('activeTab');
              }

              const gutter = tabBarGutter && index === children!?.length - 1 ? 0 : tabBarGutter;

              const marginProperty = direction === 'rtl' ? 'marginLeft' : 'marginRight';
              const style = {
                  [isVertical(tabBarPosition) ? 'marginBottom' : marginProperty]: gutter,
              };
              warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');

              let node: React.ReactNode = (dragable ?
                  <Draggable key={child.key + "_" + index} index={index} draggableId={child.key + "_" + index}>
                      {(provided: any) => (
                          <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={child.key + "_" + index}
                              className={cls} nodekey={key}>
                              <div
                                  role="tab"
                                  aria-disabled={child.props.disabled ? 'true' : 'false'}
                                  aria-selected={activeKey === key ? 'true' : 'false'}
                                  {...events}
                                  // className={cls}
                                  key={key}
                                  style={style}
                                  {...ref}
                                  nid={child.props.nid}
                                  uitype={child.props.uitype}
                                  // @ts-ignore
                                  nodekey={key}
                                  closable={this.iseditable(child.props.closable)}
                                  id={child.props?.id}
                                  fieldid={child.props?.fieldid ? child.props?.fieldid : fieldid ? fieldid + '-tabs-area-' + index : undefined}
                              >
                                  {typeof child.props.tab == 'function' ? child.props.tab(<div className="wui-tabs-text-content"></div>, key) : child.props.tab}
                                  {/* {child.props.tab} */}
                              </div>
                          </div>
                      )}

                  </Draggable> : (<div
                      role="tab"
                      aria-disabled={child.props.disabled ? 'true' : 'false'}
                      aria-selected={activeKey === key ? 'true' : 'false'}
                      {...events}
                      className={cls}
                      key={key}
                      style={style}
                      {...ref}
                      nid={child.props.nid}
                      uitype={child.props.uitype}
                      // @ts-ignore
                      nodekey={key}
                      closable={this.iseditable(child.props.closable)}
                      id={child.props?.id}
                      fieldid={child.props?.fieldid ? child.props?.fieldid : fieldid ? fieldid + '-tabs-area-' + index : undefined}
                  >
                      {typeof child.props.tab == 'function' ? child.props.tab(<div className="wui-tabs-text-content"></div>, key) : child.props.tab}
                      {/* {child.props.tab} */}
                  </div>)
              );

              if (renderTabBarNode) {
                  node = renderTabBarNode(node);
              }

              rst.push(node);
          });
      }
      return rst
  }

  render() {
      const {
          //   panels: children,
          //   activeKey,
          //   clsPrefix,
          //   tabBarGutter,
          saveRef,
          //   tabBarPosition,
          //   renderTabBarNode,
          //   direction,
          dragable,
          //   fieldid,
          //   id
      } = this.props;
      //   const rst: any[] = [];

      //   React.Children.forEach(children, (child: React.ReactElement, index) => {
      //       if (!child) {
      //           return;
      //       }
      //       const key = child.key;
      //       let cls = activeKey === key ? `${clsPrefix}-tab-active` : '';
      //       cls += ` ${clsPrefix}-tab`;
      //       let events = {};
      //       if (child.props.disabled) {
      //           cls += ` ${clsPrefix}-tab-disabled`;
      //       } else {
      //           events = {
      //               onClick: this.onTabClick.bind(this, key),
      //           };
      //       }
      //       let ref: Record<string, unknown> = {};
      //       if (activeKey === key) {
      //           ref.ref = saveRef!('activeTab');
      //       }

      //       const gutter = tabBarGutter && index === children!?.length - 1 ? 0 : tabBarGutter;

      //       const marginProperty = direction === 'rtl' ? 'marginLeft' : 'marginRight';
      //       const style = {
      //           [isVertical(tabBarPosition) ? 'marginBottom' : marginProperty]: gutter,
      //       };
      //       warning('tab' in child.props, 'There must be `tab` property on children of Tabs.');

      //       let node: React.ReactNode = (dragable ?
      //           <Draggable key={child.key + "_" + index} index={index} draggableId={child.key + "_" + index}>
      //               {(provided: any) => (
      //                   <div
      //                       ref={provided.innerRef}
      //                       {...provided.draggableProps}
      //                       {...provided.dragHandleProps}
      //                       key={child.key + "_" + index}
      //                       className={cls}>
      //                       <div
      //                           role="tab"
      //                           aria-disabled={child.props.disabled ? 'true' : 'false'}
      //                           aria-selected={activeKey === key ? 'true' : 'false'}
      //                           {...events}
      //                           // className={cls}
      //                           key={key}
      //                           style={style}
      //                           {...ref}
      //                           // @ts-ignore
      //                           nid={child.props.nid}
      //                           uitype={child.props.uitype}
      //                           nodekey={key}
      //                           closable={this.iseditable(child.props.closable)}
      //                           id={id ? id + '-tabs-area-' + index : undefined}
      //                           fieldid={fieldid ? fieldid + '-tabs-area-' + index : undefined}
      //                       >
      //                           {child.props.tab}
      //                       </div>
      //                   </div>
      //               )}

      //           </Draggable> : (<div
      //               role="tab"
      //               aria-disabled={child.props.disabled ? 'true' : 'false'}
      //               aria-selected={activeKey === key ? 'true' : 'false'}
      //               {...events}
      //               className={cls}
      //               key={key}
      //               style={style}
      //               {...ref}
      //               // @ts-ignore
      //               nid={child.props.nid}
      //               uitype={child.props.uitype}
      //               nodekey={key}
      //               closable={this.iseditable(child.props.closable)}
      //               id={id ? id + '-tabs-area-' + index : undefined}
      //               fieldid={fieldid ? fieldid + '-tabs-area-' + index : undefined}
      //           >
      //               {child.props.tab}
      //           </div>)
      //       );

      //       if (renderTabBarNode) {
      //           node = renderTabBarNode(node);
      //       }

      //       rst.push(node);
      //   });
      return (dragable ?
          <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                  {(provided: any) => (
                      <div ref={provided.innerRef}>
                          <div
                              ref={saveRef!('navTabsContainer')}
                          >
                              {this.handleItems()}
                          </div>
                      </div>
                  )}
              </Droppable>
          </DragDropContext> :
          <div ref={saveRef!('navTabsContainer')}>
              {this.handleItems()}
          </div>
      );
  }
}

// TabBarTabsNode.propTypes = {
//     activeKey: PropTypes.string,
//     panels: PropTypes.node,
//     clsPrefix: PropTypes.string,
//     tabBarGutter: PropTypes.number,
//     onTabClick: PropTypes.func,
//     saveRef: PropTypes.func,
//     renderTabBarNode: PropTypes.func,
//     tabBarPosition: PropTypes.string,
//     direction: PropTypes.string,
//     fieldid: PropTypes.string,
//     dragable: PropTypes.bool,
//     onDrag: PropTypes.func
// };

// TabBarTabsNode.defaultProps = {
//     panels: [],
//     clsPrefix: [],
//     tabBarGutter: null,
//     onTabClick: () => {
//     },
//     saveRef: () => {
//     },
// };

import { Scrollspy as ScrollSpy } from '@makotot/ghostui/src/Scrollspy';
import {
  history,
  Link,
  useLocation,
  useRouteMeta,
  useSiteData,
  useTabMeta,
} from 'dumi';
import React, {
  useEffect,
  useRef,
  useState,
  type FC,
  type RefObject,
} from 'react';
import './index.less';

const CustomToc: FC = (props: any) => {
  const { memoToc } = props
  const { pathname, search, hash } = useLocation();
  const { loading } = useSiteData();
  const prevIndexRef = useRef(0);
  const [sectionRefs, setSectionRefs] = useState<RefObject<HTMLElement>[]>([]);

  useEffect(() => {
    // wait for page component ready (DOM ready)
    if (!loading) {
      // find all valid headings as ref elements
      const refs = memoToc?.map(({ id }) => ({
        current: document.getElementById(id),
      })) || []

      setSectionRefs(refs as any);
    }
  }, [pathname, search, loading, memoToc]);

  return sectionRefs.length ? (
    <ScrollSpy sectionRefs={sectionRefs} offset={20}>
      {({ currentElementIndexInViewport }) => {
        // for keep prev item active when no item in viewport
        if (currentElementIndexInViewport > -1)
          prevIndexRef.current = currentElementIndexInViewport;

        return (
          <ul className="dumi-default-toc">
            {memoToc
              .filter(({ depth }) => depth > 1 && depth < 4)
              .map((item, i) => {
                const link = `${search}#${encodeURIComponent(item.id)}`;
                const activeIndex =
                  currentElementIndexInViewport > -1
                    ? currentElementIndexInViewport
                    : prevIndexRef.current;

                return (
                  <li className='toc-item' key={item.id} data-depth={item.depth}>
                    <Link
                      to={link}
                      onClickCapture={() => {
                        if (decodeURIComponent(hash).slice(1) === item.id) {
                          history.replace(`${pathname}${search}`);
                        }
                      }}
                      title={item.title}
                      {...(activeIndex === i ? { className: 'active' } : {})}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        );
      }}
    </ScrollSpy>
  ) : null;
};

export default CustomToc;

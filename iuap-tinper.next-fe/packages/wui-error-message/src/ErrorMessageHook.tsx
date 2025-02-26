import { useEffect, useState } from "react";

export const useWindowHeight = () => {
    const [height, setheight] = useState(0);
    useEffect(() => {
        setheight(document.documentElement.clientHeight);
    }, []);
    useEffect(() => {
        const debounce = (fn: any, delay: number) => {
            let timer: any = null;
            return function() {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    fn.apply(this, arguments);
                }, delay);
            };
        };
        const handleResize = debounce(() => {
            setheight(document.documentElement.clientHeight);
        }, 100);
        // TODO防抖
        window.addEventListener("resize", handleResize, false);
        return () => {
            window.removeEventListener("resize", handleResize, false);
        };
    }, []);
    return [height];
};
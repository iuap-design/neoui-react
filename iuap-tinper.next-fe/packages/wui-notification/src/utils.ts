// 创建一个可启动、暂停、恢复、停止的计时器，默认最小计时间隔100ms
export function usePauseableTimer({
    stopCb = () => {}, // 停止计时的回调
    duration,
    beatInterval = 100
}: { stopCb?: () => void, duration: number, beatInterval?: number }) {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let startTime: number | null = null;
    let pausedTime: number | null = null;
    let elapsedTime: number = 0; // 已经计时的时间
    let isRunning: boolean = false;

    function start() {
        if (!isRunning) {
            // 重置计时器状态
            elapsedTime = 0;
            pausedTime = null;
            startTime = Date.now();
            timeoutId = setTimeout(tick, beatInterval);
            isRunning = true;
        }
    }

    function pause() {
        if (isRunning) {
            pausedTime = Date.now();
            elapsedTime += pausedTime - startTime!;
            clearTimeout(timeoutId!);
            isRunning = false;
        }
    }

    // 恢复计时器
    function resume() {
        if (!isRunning) {
            start();
        }
    }

    // 停止，用于结束计时器
    function stop() {
        isRunning = false;
        stopCb();
        clearTimeout(timeoutId!);
    }

    // 重置，用于销毁计时器，如unmount钩子
    function clear() {
        elapsedTime = 0;
        pausedTime = null;
        startTime = null;
        isRunning = false;
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }

    // 计时器计时函数，滴答滴答计时啦
    function tick() {
        if (isRunning) {
            elapsedTime = Date.now() - startTime!;

            // 检查是否超过了总时长
            if (elapsedTime >= duration) {
                stop();
            } else {
                timeoutId = setTimeout(tick, beatInterval);
            }
        }
    }

    return { start, stop, pause, resume, clear };
}

module.exports = function(source, componentA, componentB) {
    
    if(typeof source !== "object") {
        componentB = componentA;
        componentA = source;
        source = this;
    }
    if (typeof componentA !== 'function') {
        componentA = defaultXSelector;
    }
    if (typeof componentB !== 'function') {
        componentB = defaultYSelector;
    }
    
    return source
        .timeInterval()
        .scan(function(prev, event) {
            var curr = event.value,
                interval = event.interval,
                mx = componentA(prev),
                my = componentB(prev),
                ex = componentA(curr),
                ey = componentB(curr),
                vx = (ex - mx) / interval,
                vy = (ey - my) / interval;
            
            curr.magnitude = Math.abs(
                Math.sqrt((ex * ex) + (ey * ey)) -
                Math.sqrt((mx * mx) + (my * my))
            );
            
            curr.angle = Math.atan2(vy, vx);
            
            return curr;
        })
        .skip(1);
};

function defaultXSelector(m) { return m.x; }
function defaultYSelector(m) { return m.y; }
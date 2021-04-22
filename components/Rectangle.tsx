import React from 'react';

const POSITION = {x: 0, y: 0};

const Rectangle = () => {
  const [state, setState] = React.useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })

  const handleMouseMove = React.useCallback(({clientX, clientY}) => {
    const translation = {x: clientX  - 541, y: clientY - 436};

    setState(state => ({
      ...state,
      translation
    }))
  }, [state.origin]);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])  

  
  const transform = `rotateY(${state.translation.x * 2.5}deg) rotateX(-${state.translation.y * 2.5}deg)`
  // const transform = `rotateY(100000000deg) rotateX(-${state.translation.y * 2.5}deg)`

  return <div className="cursor-pointer mx-auto" style={{ perspective: 500, width: 300, height: 200, transform: "scale(0.5)" }}>
  <div style={{ width: 300, height: 200, position: "relative", transformStyle: "preserve-3d", transition: "transform 1s", transform: `translateZ(-50px) rotateX(45deg) rotateY(30deg) ${transform}`}}>
    <div style={{ width: 300, height: 200, backgroundColor: "hsla(0, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(0deg) translateZ(50px)" }} ></div>
    <div style={{ width: 300, height: 200, backgroundColor: "hsla(120, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(180deg) translateZ(50px)" }} ></div>
    <div style={{ width: 100, height: 200, left: 100, backgroundColor: "hsla(60, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(90deg) translateZ(150px)" }}></div>
    <div style={{ width: 100, height: 200, left: 100, backgroundColor: "hsla(180, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(-90deg) translateZ(150px)" }}></div>
    <div style={{ width: 300, height: 100, top: 50, backgroundColor: "hsla(240, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "100px", fontSize: 40, position: "absolute", transform: "rotateX(90deg) translateZ(100px)" }}></div>
    <div style={{ width: 300, height: 100, top: 50, backgroundColor: "hsla(300, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "100px", fontSize: 40, position: "absolute", transform: "rotateX(-90deg) translateZ(100px)" }}></div>
  </div>
</div>
}

export default Rectangle;
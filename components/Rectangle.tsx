import React from 'react';

const POSITION = {x: 0, y: 0};

const Rectangle = () => {
  const [state, setState] = React.useState({
    isDragging: false,
    origin: POSITION,
    translation: POSITION,
  })

  // const handleMouseDown = React.useCallback(({ clientX, clientY }) => {
  //   console.log(clientX, clientY);
  //   setState(state => ({
  //     ...state,
  //     isDragging: true,
  //     origin: { x: clientX, y: clientY }
  //   }))

  // }, []);

  const handleMouseMove = React.useCallback(({clientX, clientY}) => {
    const translation = {x: clientX  - 541, y: clientY - 436};

    setState(state => ({
      ...state,
      translation
    }))
  }, [state.origin]);

  // const handleMouseUp = React.useCallback(({}) => {
  //   setState(state => ({
  //     ...state,
  //     isDragging: false
  //   }))
  // }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove)
    // if (state.isDragging) {

    //   // console.log("added event listeners")
    //   window.addEventListener('mousemove', handleMouseMove);
    //   window.addEventListener('mouseup', handleMouseUp);
    // } else {
    //   // console.log("removed event listeners")
    //   window.removeEventListener('mousemove', handleMouseMove);
    //   window.removeEventListener('mouseup', handleMouseUp);

    //   setState(state => ({ ...state, translation: POSITION }))
    // }
  }, [handleMouseMove])  

  // console.log('state', state.isDragging);

  // const style = {
  //   front: "rotateY(0deg)",
  //   back: "rotateY(-180deg)",
  //   right: "rotateY(-90deg)",
  //   left: "rotateY(90deg)",
  //   top: "rotateX(-90deg)",
  //   bottom: "rotateX(90deg)",
  // }
  
  const transform = `rotateY(${state.translation.x * 2.5}deg) rotateX(-${state.translation.y * 2.5}deg)`
  // const transform = `rotateY(100000000deg) rotateX(-${state.translation.y * 2.5}deg)`

  return <div className="cursor-pointer mx-auto" style={{ perspective: 500, width: 300, height: 200, transform: "scale(0.5)" }}>
  <div style={{ width: 300, height: 200, position: "relative", transformStyle: "preserve-3d", transition: "transform 1s", transform: `translateZ(-50px) ${transform}`}}>
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
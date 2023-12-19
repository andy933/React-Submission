import Part from './Part'

const Content = ({ parts }) => 
  <>
{/*     <Part
      part={parts[0]} 
    />
    <Part
      part={parts[1]} 
    />
    <Part
      part={parts[2]} 
    />   
    <Part
      part={parts[3]} 
    />   */}  
    {parts.map((part, i) => 
        <Part key={i} part={part} />
    )}
    
  </>

export default Content
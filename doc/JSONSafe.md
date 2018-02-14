# Immutable single store state management.  
# lodux 2.0.0

A JSON safe is (for this framework only):  

1. value is a simple key,value pair object.  
2. key must be string.  
3. key,value pair do not include Map, Set, Symbol, and literal NaN, function, literal NaN, literal -0.  

e.g.    

|correct        
|-------------     
|{a:'10'}       

|incorrect      |reason
|-------------  |------------      
|{a: new Map()} |Map object is not allowed
|{a: NaN}       |literal NaN is not allowed
|{a: ()=>{}}    |function is not allowed
|{a:Symbol('a')}|Symbol is not allowed
|{[Symbol('a')]:'a'}|Symbol is not allowed
|{a:-0}|-0 is considered is not allowed

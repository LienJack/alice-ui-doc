# 工具函数
## vue组件事件传递

### broadcast
广播：
父级-》孙子级 广播事件
```javascript
broadcast(componentName, eventName, params) {
  // broadcast.call(this, componentName, eventName, params);
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
```

### dispatch
分派
```javascript
dispatch(componentName, eventName, params) {
  let parent = this.$parent || this.$root;
  let name = parent.$options.name;
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.name;
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
},
```

### findComponentUpward
向上找到最近的指定组件
```javascript
 findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while(parent && (!name || ![componentName].includes(name))) {
    parent = parent.$parent
    if(parent) name = parent.$options.name
  }
  return parent
}
```

### findComponentsUpward
由一个组件，向上找到所有的指定组件
```javascript
function findComponentsUpward(context, componentName) {
 let parents = []
 const parent = context.$parent

 if(parent) {
   if(parent.$options.name === componentName) parents.push(parent)
   return parents.concat(findComponentsUpward(parent, componentName))
 } else {
   return []
 }
}
```

### findComponentDownward
向下找到最近的指定组件
```javascript
findComponentDownward (context, componentName) {
 const childrens = context.$children
 let children = null
 if(childrens.length) {
   for(const child of childrens) {
     const name = child.$options.name
     if(name === componentName) {
       children = child
       break
     } else {
       children = findComponentDownward(child,componentName)
       if(children) break // 找到一个之后全部停止遍历
     }
   }
 }
 return children
}
```

### findComponentsDownward
```javascript
function findComponentsDownward (context, componentName) {
 return context.$children.reduce((components, child) => {
   if (child.$options.name === componentName) components.push(child);
   const foundChilds = findComponentsDownward(child, componentName);
   return components.concat(foundChilds);
 }, []);
}
```

### findBrothersComponents
```javascript
findBrothersComponents (context, componentName, exceptMe = true) {
 let res = context.$parent.$children.filter(item => {
   return item.$options.name === componentName;
 });
 let index = res.findIndex(item => item._uid === context._uid);
 if (exceptMe) res.splice(index, 1);
 return res;
}
```

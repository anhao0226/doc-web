

const type2Number = {
  '[object Array]': 0,
  '[object String]': 1,
  '[object Number]': 2,
  '[object Object]': 3,
  '[object Null]': 4,
  '[object Undefined]': 5,
}

function hasOwnProperty(obj, k) {
  return Object.prototype.hasOwnProperty.call(obj, k);
}


function dataType(v) {
  const tpy = Object.prototype.toString.call(v)
  return type2Number[tpy]
}

// 处理处理数据



function findValue(target, args, seek) {
  
  switch (dataType(target)) {
    case 0:// Array
      const n = parseInt(args[seek])
      if(n <= target.length - 1){
        const temp = target[n];
        if(++seek < args.length){
          return findValue(temp, args, seek);
        }else {
          return temp;
        }
      }
    case 1:// String
      break;
    case 2:// Number
      break;
    case 3:// Object
      if(hasOwnProperty(target, args[seek])){
        const temp = target[args[seek]];
        if(++seek < args.length){
          return findValue(temp, args, seek);
        }else {
          return temp
        }
      }
  }
  return -1
}


const templet = {
  Code: '2001',
  Success: true,
  Object: {
    a: {
      c: {
        g: [1,2,3,4,5,6,
          {
            a: ['1']
          },8]
      },
      d: '2',
    },
    b: "World"
  },
}

// Object,a,a,a,a
console.log(findValue(templet, ['Object', 'a', 'c', 'g', '6','a','0'], 0));
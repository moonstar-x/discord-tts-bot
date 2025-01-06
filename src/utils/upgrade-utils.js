const arrayToChoice = (oldInput) => {
  return { name: oldInput[0], value: oldInput[1] };
};

const oldChoiceListToNew = (oldChoiceArray) => {
  const n = [];
  for(var i = 0; i < oldChoiceArray.length; i++){
    n.push(arrayToChoice(oldChoiceArray[i]));
  }
  return n;
}

module.exports = {
    oldChoiceListToNew
};

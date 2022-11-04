import Notiflix from 'notiflix';
const formData = document.querySelector('form');
formData.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  let delayData = +formData.elements.delay.value;
  const stepData = +formData.elements.step.value;
  const amountData = +formData.elements.amount.value;
  evt.target.reset();
  for (let amount = 0; amount < amountData; amount++){
    createPromise(amount + 1, (delayData))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `:белая_галочка: Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `:х: Rejected promise ${position} in ${delay}ms`
        );
      });
delayData+=stepData
    }

  function createPromise(position, delay) {
    const promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, (delay));
    });
    return promise;
  }
}
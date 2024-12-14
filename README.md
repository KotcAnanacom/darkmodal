# DarkModal

Простая JavaScript библиотека для работы с модальными окнами

--- 

## Подключение 
Для подключения установите библиотеку с помощью npm: 
```bash
npm i darkmodal
```
Затем импортируйте библиотеку в ваш JavaScript файл:
```js
import DarkModal from 'darkmodal'
import 'darkmodal/dist/darkmodal.min.css'
```
Или скачайте файлы `darkmodal.min.js` и `darkmodal.min.css` из папки `dist`, и подключите их в ваш HTML файл 

В хтмл файл __поместите следующий код__
```html 
<button class="darkmodal-open" data-darkmodal-path="first">Открыть модальное окно 1</button>
<dialog class="darkmodal" aria-label="Модальное окно" data-darkmodal-target="first" data-darkmodal-animation="fade" data-darkmodal-speed="400">
  <div class="darkmodal__inner">
    <button class="darkmodal-close">Закрыть модальное окно 1</button>
    <div class="darkmodal__content">
      <h2>Заголовок модального окна</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </div>
  </div>
</dialog>
```

### Главные нюансы
1. `[data-darkmodal-path]` — атрибут который связывает с модальным окном. Без этого атрибута модальное окно не будет открываться
2. `[data-darkmodal-target]` — атрибут который связывает модальное окно с кнопкой. Без этого атрибута модальное окно не будет открываться
**Важно** значение атрибутов `[data-darkmodal-path]` и `[data-darkmodal-target]` должны быть одинаковы. Для разных окон используйте разные значения.
3. `[data-darkmodal-animation]` — анимация при открытии/закрытии модального окна, по умолчанию — **fade**
4. `[data-darkmodal-speed]` — скорость анимации при открытии/закрытии модального окна, по умолчанию — **400** (указывается в __ms__)
5. `.darkmodal` — само модально окно, которое также создает "затемнение" при открытии
6. `.darkmodal-close` — кнопка для закрытия модального окна. Если удалить этот класс, то закрытие не будет происходить
7. `.darkmodal__content` — здесь размещается контент модального окна

### Подключение в JavaScript файле
Для подключения библиотеки создайте новый экземпляр `DarkModal`:
```js
const darkModal = new DarkModal()
```
Модалка уже работает, но вы так же можете передать параметры при открытии или закрытии модалки
```js
const darkModal = new DarkModal({
  isOpen: (modal) => {
    console.log(modal)
  },
  isClose: () => {
    console.log('Закрыто')
  }
})
```
`modal` - это объект, ссылающийся на открытое модальное окно. Это может быть полезно, если нужно добавить что-либо в модальное окно 

#### Открытие конкретного окна по событию

Если вы хотите открыть модальное окно по событию, например, при клике на кнопку, используйте следующий код
```js
const btn = document.querySelector('.darkmodal-open')
btn.addEventListener('click', () => {
  new DarkModal()
})
```

### Поддерживаються вложенные модалки!
Вы можете создавать вложенные модальные окна. **Будьте осторожны**, так как при открытии второго окна наложится новый слой `затемнения backdrop(overlay)`. Чтобы изменить стиль затемнения для вложенных окон, добавьте свой класс и настройте его, например:
```css
.class::backdrop {
  background-color: #ff0;
}
```
Более наглядно показано в `demo/index.html`

### Кастомные анимации
По умолчанию есть 3 вида анимаций — `fade` `slide` `flip`, но вы можете создать свою собственую, пример: 
```css
.darkmodal.fade-up {
  opacity: 0;
  transform: translateY(-100px);
  transition: opacity var(--transition-time), transform var(--transition-time);
}

.darkmodal.fade-up.animation {
  opacity: 1;
  transform: translateY(0);
}

.darkmodal.fade-up.hide {
  opacity: 0;
  transform: translateY(-100px);
}
```

### Конфигурация

| Название | Тип | По умолчанию  | Описание |
|----------|----------|----------|----------|
| animation| String   | 'fade'   | Устанавливает тип анимации по умолчанию. Атрибут `[data-darkmodal-animation]` перебивает это значение         |
| speed    | Number   | 400   |   Устанавливает скорость анимации. Атрибут `[data-darkmodal-speed]` перебивает это значение    |
| closeAll    | boolean   | false   | Для вложенных модальных окон. При клике на backdrop, ESC будут закрываться все модальные окна. Так же на кнопку с атрибутом `[data-darkmodal-close-all]` будут закрываться все модальные окна       |

По багам, доработкам, вопросах можете писать в [Telegram](https://t.me/kotcananacom)
Приятного использования!

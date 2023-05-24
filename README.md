# 👋🏼 'Minor Mayhem'

For [this](https://github.com/cmda-minor-web/browser-technologies-2223) course, you will design and create an interactive application based on the principle of Progressive Enhancement. Ensure that all users, with all browsers, in any context, can experience the application as well as possible through sight, sound, and/or touch. The most 'enhanced' version should provide a delightful user experience, being aesthetically pleasing and enjoyable to use.

**Learning Objectives**

-   _You will learn what Progressive Enhancement is and how to apply it._
-   _You will learn to research, test, and implement Browser Technologies as enhancements._
-   _You will learn how to perform Feature Detection and what to do when a feature does not work or is not supported._

There were several user stories you could pick from. I chose to go with 'Survey about the Web Development minor'.

> I want to be able to complete a survey about the minor Web Development, with various answer options. I want to clearly see where I am and how much I still have to do. I want to be able to review previously answered questions. If I don't finish the survey, I want to be able to resume from where I left off later.

---

## 🔧 Core functionality/features

[x] Survey Form: Design and implement a user-friendly survey form where participants can provide their feedback on the minor.

[x] Form validation: Validate the form to ensure that all required fields are completed. Provide clear error messages when validation fails.

[x] Multiple Answer Options: Include various answer options for the survey questions, allowing participants to choose from a predefined set of responses.

[x] Progress Tracking: Display a clear indication of the participant's progress within the survey, showing which questions have been completed and how many are remaining.

[x] Question Review: Enable participants to review and revise their previously answered questions during the survey.

[x] Resumable Survey: Allow participants to save their progress and resume the survey later from where they left off, in case they are unable to complete it in one session.

[x] Functional without JavaScript: The site also works without Javascript and only uses Javascript to enhance the user experience.

[x] Light and Dark mode: The user can choose between light and dark mode based on their system preferences `prefers-color-scheme`.

[x] Accessible: The site is accessible for everyone. It works with a keyboard and screen reader.

**Survey requirements**

-   Student Information: Include mandatory fields for capturing student details such as name and student number.

-   Per course:

    -   Course Details: Collect information about each course, including the course name, teacher(s), and weeks in which the course was taken.
    -   Rating Scale: Implement a rating scale (e.g., 1-10) for evaluating aspects of each course, such as difficulty level, clarity of explanation, and the participant's understanding.

-   Form Field Management: Display a limited number of form fields at a time, preventing the user from being overwhelmed with too many questions on a single page.

-   Validation: Implement form validation to ensure that all required fields are completed. Provide clear error messages when validation fails. Determine when and how the validation will occur.

-   Navigation Interface: Create a clear interface that allows users to navigate back to previous questions. Optionally, consider providing a skip option for questions if applicable.

-   Progress Indicator: Design a visual indicator within the form interface to show participants their current position in the survey.

-   Styling Options: Implement both light mode and dark mode themes for the form to cater to user preferences.

-   Radio Button Styling: Customize the appearance of radio buttons to make them less visible or find alternative ways to display the answer options.

---

## 🎨 Design

I made a quick design in Figma to get an idea of what I wanted to make. This way, I could get a good grip on the colors I'm going to use and the contrast between those colors.

---

## 🌱 Progressive Enhancement

I applied progressive enhancement by starting with setting up the HTML first, without CSS and JavaScript. Then I added the CSS and later the JavaScript. This ensures that the website functions even without CSS and JavaScript. Users can still navigate through the website. However, in this case, data cannot be saved, and it would need to be handled server-side.

A great example is the validation of the input fields. When the user provides incorrect input, an error message is displayed. This error message is displayed through JavaScript. When JavaScript is disabled, the error message is displayed through HTML5 validation (and if CSS is enabled, an extra error visual will be shown).

---

## 🔬 Feature detection

Feature detection is a way to check if the browser supports the implemented feature. I used [Can I Use](https://caniuse.com/) to check if a browser supports a specific feature. If the browser doesn't support the feature, I used a fallback or chose to completely change my approach.

### localStorage

I used localStorage to save the data of the user. This way, the user can resume the survey later. I used feature detection to check if the browser supports localStorage. If it doesn't, my app still works but the data won't be saved.

```js
// http://diveintohtml5.info/storage.html
export function supports_html5_storage() {
	try {
		if ('localStorage' in window && window['localStorage'] !== null) {
			localStorage.setItem('testitem', true);
			localStorage.getItem('testitem');
			localStorage.removeItem('testitem');
			return true;
		}
	} catch (e) {
		return false;
	}
}
```

### @supports

I used @supports to check if the browser supports a specific CSS property. If it doesn't, I used a fallback. For example, I used @supports to check if the browser supports `display: grid;`.

```css
@supports (display: grid) {
	.courses li > div + div {
		display: grid;
		grid-template-columns: 1fr 0.1fr;
		padding: 1rem 0.875rem;
	}
	.enq fieldset > legend + div {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.25rem;
	}
	@media only screen and (min-width: 600px) {
		.enq fieldset > legend + div {
			grid-template-columns: repeat(10, 1fr);
		}
	}
}
```

### prefers-reduced-motion

The @media (prefers-reduced-motion: no-preference) CSS media query targets user preferences for reduced motion on webpages.

The no-preference value indicates that the user has not expressed a preference for reduced motion. This means that animations and other motion effects can be used without any restrictions.

```js
@media (prefers-reduced-motion: no-preference) {
	[data-bubble] > div .bubble {
		animation: bubble-size var(--blob-time, 4s) ease-in infinite var(--blob-delay, 0s),
			bubble-move var(--blob-time, 4s) ease-in infinite var(--blob-delay, 0s);
	}
}
```

---

## 🌍 Accessibility

### Color contrast

Ensuring that your website is accessible to all users, including those with visual impairments, is an essential aspect of web design. One crucial consideration is the contrast between the colors used in your design. To address this, I conducted a thorough evaluation of color contrast throughout the website using a contrast checker.

By utilizing a contrast checker, I assessed the color combinations present in various elements of the website, such as text, buttons, and backgrounds. This process allowed me to verify that the color choices adhere to recognized accessibility standards, ensuring that the content remains legible and discernible for individuals with visual challenges.

### Keyboard navigation

I tested the website using a keyboard to ensure that all interactive elements are accessible and usable. I navigated through the website using the Tab key and the arrow keys. I also tested the website using the Tab key and the arrow keys in combination with the Shift key to ensure that the focus order is logical and intuitive.

The main issue I encountered was that different browsers have different ways to go through a website. You think every browser has navigation with the Tab key standardly enabled, but that's not the case. For example, in Safari and Firefox, you have to enable this feature manually. Safari does have a different standard shortcut for this, `option + Tab`.

### Screen reader

I tested the website using a screen reader to ensure that all interactive elements are accessible and usable. I used VoiceOver on macOS. I made sure that the order was logical and that labels where correctly connected to their corresponding inputs (my input are either in the label or the label contains a `for` attribute).

---

## 🌐 Tested browsers

-   [x] Google Chrome v113.0.5672.126
-   [x] Google Chrome v115.0.5790.0
-   [x] Mozilla Firefox v113.0.1
-   [x] Safari Desktop v16.4
-   [x] Safari Mobile v16.6
-   [x] Samsung Internet v20.0.3.10
-   [x] Flow v6.9.0

### 🔍 Flow v.6.9.0

[Flow](https://www.ekioh.com/flow-browser/) is a new browser that features a completely new multi-threaded rendering engine, distinct from WebKit, Gecko, or Blink. Developed by Ekioh, Flow aims to provide improved performance and rendering capabilities for user interfaces.

During my testing of the browser, I encountered difficulties due to the lack of documentation. It was challenging to determine the browser's supported features and limitations. This became evident when I tested my survey site and encountered various issues:

-   `gap` was not supported.
-   There's no `cursor: pointer;` support.
-   There seems to be an issue with `width` on anchor tags and buttons.
-   The `:hover` state doesn't work on anchor tags and buttons.
-   Couldn't tab through the page.
-   Couldn't check a radio button.
-   `prefers-reduced-motion` was not supported.
-   `border-radius` on `span` elements that don't have a `display` property set doesn't work.
-   `::placeholder` property not supported.
-   Can't select text.
-   Javascript doesn't work.

---

## 📦 Installation

1. Clone this repository

```
$ git clone https://github.com/ninadepina/minor-mayhem.git
```

2. Open the `index.html` file in your browser or use localhost

```
http://localhost:5500/
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/ninadepina/minor-mayhem/blob/main/LICENSE) file for more details.

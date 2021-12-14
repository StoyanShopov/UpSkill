import React, { useState, useEffect } from 'react';

import Book from '../../assets/Courses-CategoryAndLanguage-Book.png';
import Person from '../../assets/Coaches-CategoryAndLanguage-Person.png';

import './categoryAndLanguageMenu_Styles.css';

import { getCoachCategories } from '../../services/categoryService';
import { getCourseCategories } from '../../services/categoryService';
import { getLanguages } from '../../services/languageService';

function CategoriesAndLanguageMenu({ atPage }) {
  let pic = atPage === 'Courses' ? Book : Person;
  let [allCoachCategories, setAllCoachCategories] = useState([]);
  let [allCourseCategories, setAllCourseCategories] = useState([]);
  let [allLanguages, setAllLanguages] = useState([]);

  let [categoriesChosen, setCategories] = useState([]);
  let [languagesChosen, setLanguages] = useState([]);

  useEffect(() => {
      getCoachCategories().then((categories) => {
        setAllCoachCategories(categories);
      });
      getCourseCategories().then((categories) => {
        setAllCourseCategories(categories);
      });
  }, []);

  useEffect(() => {
    getLanguages().then((languages) => {
      setAllLanguages(languages);
    });
  }, []);

  function handleChange(e, atForm) {
    let currentValues =
      e.target.parentElement.parentElement.parentElement.querySelectorAll(
        'input[type="checkbox"]:checked'
      );

    currentValues.forEach((el) => {
      console.log(el.value);
    });

    atForm === 'categories'
      ? setCategories(currentValues)
      : setLanguages(currentValues);
  }

  let allCategories = [];
  if (atPage === 'Courses') {
    allCategories = allCoachCategories;
  }else{
    allCategories = allCourseCategories;
  }

  return (
    <div className={atPage + ' full-width'}>
      <aside className="d-flex container justify-content-between pt-5 pb-5">
        <div className="content searchContent">
          <fieldset className="row categoryField">
            <legend className="fw-bolder" htmlFor="category">
              Category
            </legend>
            <form
              name="category"
              id="category"
              className="categoryForm"
              onChange={(e) => handleChange(e, 'categories')}
            >
              {allCategories.map((category) => {
                return (
                  <div key={category}>
                    <label htmlFor={category}>
                      <input
                        className="m-2 form-check-input searchContent-input"
                        type="checkbox"
                        id={category}
                        name="category"
                        value={category}
                      />
                      <span className="fs-5">{category}</span>
                    </label>
                  </div>
                );
              })}
            </form>
          </fieldset>

          <fieldset className="row languageForm">
            <legend className="fw-bolder" htmlFor="language">
              Language
            </legend>
            <form
              name="language"
              id="language"
              onChange={(e) => handleChange(e, 'languages')}
            >
              {allLanguages.map((language) => {
                return (
                  <div key={language}>
                    <input
                      className="m-2 form-check-input searchContent-input"
                      type="checkbox"
                      id={language}
                      name="category"
                      value={language}
                    />
                    <label className="fs-5" htmlFor={language}>
                      {language}
                    </label>
                  </div>
                );
              })}
            </form>
          </fieldset>
        </div>

        <div className="row">
          <img className={atPage + 'Pic'} src={pic} alt="Book" />
        </div>
      </aside>
    </div>
  );
}

export default CategoriesAndLanguageMenu;

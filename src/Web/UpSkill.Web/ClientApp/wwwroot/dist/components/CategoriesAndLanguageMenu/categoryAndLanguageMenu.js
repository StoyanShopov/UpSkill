var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';

import Book from '../../assets/Courses-CategoryAndLanguage-Book.png';
import Person from '../../assets/Coaches-CategoryAndLanguage-Person.png';

import './categoryAndLanguageMenu_Styles.css';

import { getCategories } from '../../services/categoryService';
import { getLanguages } from '../../services/languageService';

function CategoriesAndLanguageMenu(_ref) {
    var atPage = _ref.atPage;


    var pic = atPage === 'Courses' ? Book : Person;

    var _useState = useState([]),
        _useState2 = _slicedToArray(_useState, 2),
        allCategories = _useState2[0],
        setAllCategories = _useState2[1];

    var _useState3 = useState([]),
        _useState4 = _slicedToArray(_useState3, 2),
        allLanguages = _useState4[0],
        setAllLanguages = _useState4[1];

    var _useState5 = useState([]),
        _useState6 = _slicedToArray(_useState5, 2),
        categoriesChosen = _useState6[0],
        setCategories = _useState6[1];

    var _useState7 = useState([]),
        _useState8 = _slicedToArray(_useState7, 2),
        languagesChosen = _useState8[0],
        setLanguages = _useState8[1];

    useEffect(function () {
        getCategories().then(function (categories) {
            setAllCategories(categories);
        });

        getLanguages().then(function (languages) {
            setAllLanguages(languages);
        });
    }, []);

    function handleChange(e, atForm) {
        var currentValues = e.target.parentElement.parentElement.parentElement.querySelectorAll('input[type="checkbox"]:checked');

        currentValues.forEach(function (el) {
            console.log(el.value);
        });

        atForm === 'categories' ? setCategories(currentValues) : setLanguages(currentValues);
    }

    return React.createElement(
        'div',
        { className: atPage + ' full-width' },
        React.createElement(
            'aside',
            { className: 'd-flex container justify-content-between pt-5 pb-5' },
            React.createElement(
                'div',
                { className: 'content searchContent' },
                React.createElement(
                    'fieldset',
                    { className: 'row categoryField' },
                    React.createElement(
                        'legend',
                        { className: 'fw-bolder', htmlFor: 'category' },
                        'Category'
                    ),
                    React.createElement(
                        'form',
                        {
                            name: 'category',
                            id: 'category',
                            className: 'categoryForm',
                            onChange: function onChange(e) {
                                return handleChange(e, "categories");
                            }
                        },
                        allCategories.map(function (category) {
                            return React.createElement(
                                'div',
                                { key: category },
                                React.createElement(
                                    'label',
                                    { htmlFor: category },
                                    React.createElement('input', {
                                        className: 'm-2 form-check-input searchContent-input',
                                        type: 'checkbox',
                                        id: category,
                                        name: 'category',
                                        value: category
                                    }),
                                    React.createElement(
                                        'span',
                                        { className: 'fs-5' },
                                        category
                                    )
                                )
                            );
                        })
                    )
                ),
                React.createElement(
                    'fieldset',
                    { className: 'row languageForm' },
                    React.createElement(
                        'legend',
                        { className: 'fw-bolder', htmlFor: 'language' },
                        'Language'
                    ),
                    React.createElement(
                        'form',
                        {
                            name: 'language',
                            id: 'language',
                            onChange: function onChange(e) {
                                return handleChange(e, "languages");
                            }
                        },
                        allLanguages.map(function (language) {
                            return React.createElement(
                                'div',
                                { key: language },
                                React.createElement('input', {
                                    className: 'm-2 form-check-input searchContent-input',
                                    type: 'checkbox',
                                    id: language,
                                    name: 'category',
                                    value: language
                                }),
                                React.createElement(
                                    'label',
                                    { className: 'fs-5', htmlFor: language },
                                    language
                                )
                            );
                        })
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement('img', { className: atPage + 'Pic', src: pic, alt: 'Book' })
            )
        )
    );
}

export default CategoriesAndLanguageMenu;
<%--
  Created by IntelliJ IDEA.
  User: kris
  Date: 19.09.2020
  Time: 11:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="fragments/formHeader.jsp"%>

<section class="form--steps">
    <div class="form--steps-instructions">
        <div class="form--steps-container">
            <h3>Ważne!</h3>
            <p data-step="1" class="active">
                Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy
                wiedzieć komu najlepiej je przekazać.
            </p>
            <p data-step="2">
                Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu będziemy
                wiedzieć komu najlepiej je przekazać.
            </p>
            <p data-step="3">
                Wybierz jedną, do
                której trafi Twoja przesyłka.
            </p>
            <p data-step="4">Podaj adres oraz termin odbioru rzeczy.</p>
        </div>
    </div>

    <div class="form--steps-container">
        <div class="form--steps-counter">Krok <span>1</span>/4</div>

        <form:form method="post" modelAttribute="donation">
            <!-- STEP 1: class .active is switching steps -->
            <div data-step="1" class="active">
                <h3>Zaznacz co chcesz oddać:</h3>
                <c:forEach var="categories" items="${categories}">

                    <div class="form-group form-group--checkbox">
                        <label>
                            <form:checkbox
                                    id="categoryCheckbox"
                                    name="categories"
                                    path="categoryList"
                                    value="${categories.id}"
                            />
                            <span class="checkbox"></span>
                            <span class="description"
                            >${categories.name}</span
                            >
                        </label>
                    </div>

                </c:forEach>
                <div class="form-group form-group--buttons">
                    <button id="btn-1" type="button" class="btn next-step" >Dalej</button>
                </div>
            </div>

            <!-- STEP 2 -->
            <div data-step="2">
                <h3>Podaj liczbę 60l worków, w które spakowałeś/aś rzeczy:</h3>

                <div class="form-group form-group--inline">
                    <label>
                        Liczba 60l worków:
                        <form:input id="quantity" type="number" path="quantity" step="1" min="1" />
                    </label>
                </div>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button id="btn-2" type="button" class="btn next-step">Dalej</button>
                </div>
            </div>



            <!-- STEP 4 -->
            <div data-step="3">
                <h3>Wybierz organizacje, której chcesz pomóc:</h3>

                <c:forEach items="${institution}" var="institution">

                    <div class="form-group form-group--checkbox">
                        <label>
                            <form:radiobutton  path="institution" value="${institution.id}" id="foundationRadio" />
                            <span class="checkbox radio"></span>
                            <span class="description">
                  <div class="title">Fundacja: ${institution.name}</div>
                  <div class="subtitle">
                    Cel i misja:  ${institution.description}
                  </div>
                </span>
                        </label>
                    </div>

                </c:forEach>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button id="btn-3" type="button" class="btn next-step">Dalej</button>
                </div>
            </div>

            <!-- STEP 5 -->
            <div data-step="4">
                <h3>Podaj adres oraz termin odbioru rzecz przez kuriera:</h3>

                <div class="form-section form-section--columns">
                    <div class="form-section--column">
                        <h4>Adres odbioru</h4>
                        <div class="form-group form-group--inline">
                            <label> Ulica <form:input id="street" type="text" name="address" path="street" /> </label>
                        </div>

                        <div class="form-group form-group--inline">
                            <label> Miasto <form:input id="city" type="text" name="city" path="city" /> </label>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Kod pocztowy <form:input id="zip" type="text" name="postcode" path="zipCode" maxlength="5" />
                            </label>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Numer telefonu <form:input id="numberPhone" type="phone" name="phone" path="phoneNumber" maxlength="9" />
                            </label>
                        </div>
                    </div>

                    <div class="form-section--column">
                        <h4>Termin odbioru</h4>
                        <div class="form-group form-group--inline">
                            <label> Data <form:input id="data" type="date" name="data" path="pickUpDate" /> </label>
                        </div>

                        <div class="form-group form-group--inline">
                            <label> Godzina <form:input id="time" type="time" name="time" path="pickUpTime" /> </label>
                        </div>

                        <div class="form-group form-group--inline">
                            <label>
                                Uwagi dla kuriera
                                <form:textarea id="comment" name="more_info" rows="5" path="pickUpComment"/>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button id="btn-4" type="button" class="btn next-step">Dalej</button>
                </div>
            </div>

            <!-- STEP 6 -->
            <div data-step="5">
                <h3>Podsumowanie Twojej darowizny</h3>

                <div class="summary">
                    <div class="form-section">
                        <h4>Oddajesz:</h4>
                        <ul>
                            <li>
                                <span class="icon icon-bag"></span>
                                <span id="category-result" class="summary--text"
                                ></span
                                >
                            </li>

                            <li>
                                <span class="icon icon-hand"></span>
                                <span id="foundation-result" class="summary--text"
                                >Dla fundacji "Mam marzenie" w Warszawie</span
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="form-section form-section--columns">
                        <div class="form-section--column">
                            <h4>Adres odbioru:</h4>
                            <ul>
                                <li id="street-result">Prosta 51</li>
                                <li id="city-result">Warszawa</li>
                                <li id="zipCode-result">99-098</li>
                                <li id="phone-result">123 456 789</li>
                            </ul>
                        </div>

                        <div class="form-section--column">
                            <h4>Termin odbioru:</h4>
                            <ul>
                                <li id="data-result">13/12/2018</li>
                                <li id="time-result">15:40</li>
                                <li id="comment-result">Brak uwag</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="form-group form-group--buttons">
                    <button type="button" class="btn prev-step">Wstecz</button>
                    <button type="submit" class="btn">Potwierdzam</button>
                </div>
            </div>
        </form:form>
    </div>
</section>






<%@include file="fragments/footer.jsp"%>

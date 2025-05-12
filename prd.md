```markdown
# Dokument wymagań produktu (PRD) - AI Flashcard Generator MVP

## 1. Przegląd produktu

AI Flashcard Generator to minimalna wersja produktu (MVP) w formie aplikacji webowej, zaprojektowana w celu rozwiązania problemu czasochłonnego manualnego tworzenia fiszek edukacyjnych. Aplikacja umożliwia użytkownikom generowanie fiszek tekstowych za pomocą sztucznej inteligencji (AI) na podstawie wklejonego tekstu, a także tworzenie ich manualnie. Produkt integruje się z gotowym algorytmem powtórek rozłożonych w czasie (spaced repetition), aby wspierać efektywną naukę. Celem MVP jest walidacja hipotezy, że generowanie fiszek przez AI znacząco ułatwia i przyspiesza proces tworzenia materiałów do nauki, zachęcając do korzystania z metody spaced repetition. Aplikacja będzie posiadać prosty system kont użytkowników do przechowywania utworzonych fiszek.

## 2. Problem użytkownika

Głównym problemem, który rozwiązuje ten produkt, jest znaczna ilość czasu i wysiłku wymagana do manualnego tworzenia wysokiej jakości fiszek edukacyjnych. Ten proces jest często postrzegany jako żmudny, szczególnie przez studentów pierwszych lat studiów i uczniów szkół średnich, którzy mogą nie mieć pewności, jak optymalnie dzielić informacje na poszczególne fiszki. Czasochłonność i trudność tworzenia fiszek zniechęcają potencjalnych użytkowników do regularnego korzystania z metody nauki opartej na powtórkach rozłożonych w czasie (spaced repetition), mimo jej udowodnionej skuteczności.

## 3. Wymagania funkcjonalne

### 3.1. Zarządzanie kontem użytkownika
-   Użytkownicy muszą mieć możliwość rejestracji nowego konta za pomocą adresu e-mail i hasła.
-   Użytkownicy muszą mieć możliwość logowania się do istniejącego konta za pomocą adresu e-mail i hasła.
-   System musi bezpiecznie przechowywać dane uwierzytelniające użytkowników.
-   Fiszki muszą być powiązane z kontem użytkownika, który je utworzył lub zaakceptował.

### 3.2. Generowanie fiszek przez AI
-   Użytkownik musi mieć możliwość wklejenia tekstu do dedykowanego pola wejściowego.
-   Użytkownik musi mieć możliwość wybrania liczby fiszek do wygenerowania z podanego tekstu (opcje: 1, 2 lub 3).
-   System musi wysyłać tekst i żądaną liczbę fiszek do zewnętrznego API AI (OpenRouter, darmowy model) w celu wygenerowania kandydatów na fiszki.
-   Każdy kandydat na fiszkę musi składać się z pola "przód" i "tył".
-   System musi prezentować wygenerowanych kandydatów użytkownikowi do recenzji.

### 3.3. Recenzja kandydatów na fiszki AI
-   Użytkownik musi mieć możliwość przeglądania każdego kandydata na fiszkę indywidualnie.
-   Dla każdego kandydata użytkownik musi mieć możliwość:
    -   Zaakceptowania go bez zmian.
    -   Edytowania treści pól "przód" i/lub "tył", a następnie zaakceptowania.
    -   Odrzucenia kandydata.
-   Edycja musi respektować limity znaków (przód: max 200, tył: max 500).
-   Tylko zaakceptowani (bezpośrednio lub po edycji) kandydaci są zapisywani jako fiszki w bazie danych użytkownika.
-   Zapisane fiszki muszą mieć oznaczony typ pochodzenia jako "AI".
-   Proces recenzji musi śledzić akcje akceptacji/odrzucenia dla celów metryk sukcesu.

### 3.4. Manualne tworzenie fiszek
-   Użytkownik musi mieć dostęp do prostego formularza tworzenia fiszek.
-   Formularz musi zawierać pola tekstowe na "przód" i "tył" fiszki.
-   Pola muszą mieć ograniczenia znaków: "przód" max 200 znaków, "tył" max 500 znaków.
-   Użytkownik musi mieć możliwość zapisania nowo utworzonej fiszki manualnie.
-   Zapisane fiszki muszą mieć oznaczony typ pochodzenia jako "Manual".
-   Fiszki mogą zawierać wyłącznie czysty tekst (brak formatowania, obrazów).

### 3.5. Zarządzanie fiszkami
-   Użytkownik musi mieć możliwość przeglądania listy wszystkich swoich zapisanych fiszek.
-   Lista powinna wyświetlać treść "przód" i "tył" każdej fiszki.
-   Użytkownik musi mieć możliwość edycji treści (przód/tył) istniejącej fiszki, z zachowaniem limitów znaków.
-   Użytkownik musi mieć możliwość usunięcia istniejącej fiszki.
-   W MVP nie ma funkcjonalności organizacji fiszek (folderów, talii, tagów).

### 3.6. Integracja z algorytmem powtórek (Spaced Repetition)
-   System musi integrować się z wybraną biblioteką open-source implementującą algorytm spaced repetition (konkretna biblioteka TBD).
-   System musi wykorzystywać algorytm do określania, które fiszki użytkownika są gotowe do powtórki.
-   Użytkownik musi mieć możliwość rozpoczęcia sesji powtórkowej.
-   Podczas sesji powtórkowej system musi prezentować użytkownikowi przód fiszki gotowej do powtórki.
-   Użytkownik musi mieć możliwość odsłonięcia tyłu fiszki.
-   Użytkownik musi mieć możliwość interakcji z systemem powtórek w celu oceny swojej znajomości fiszki (dokładny mechanizm interakcji zależy od wybranej biblioteki, np. przyciski "Wiem"/"Nie wiem" lub "Łatwe"/"Trudne"/"Powtórz"). Wynik oceny musi być przekazywany do biblioteki SRS w celu aktualizacji harmonogramu powtórek dla tej fiszki.

### 3.7. Wymagania Niefunkcjonalne
-   Aplikacja musi być dostępna przez przeglądarkę internetową (Web).
-   Interfejs użytkownika (UI) i doświadczenie użytkownika (UX) mają być maksymalnie proste i intuicyjne, bez zaawansowanego designu.
-   Wymagania dotyczące dostępności (accessibility) nie są priorytetem dla MVP.
-   Aplikacja w wersji MVP nie będzie dostępna publicznie.
-   System musi być w stanie obsłużyć błędy (np. błędy API AI, błędy zapisu do bazy danych) i informować o nich użytkownika w zrozumiały sposób.
-   System musi umożliwiać łatwą zmianę modelu AI i klucza API w konfiguracji (np. OpenRouter).

## 4. Granice produktu

Następujące funkcje i cechy celowo NIE wchodzą w zakres tego MVP:

-   Implementacja własnego, zaawansowanego algorytmu powtórek (jak SuperMemo, Anki). Zamiast tego używana jest gotowa biblioteka open-source.
-   Import fiszek lub treści z plików w różnych formatach (np. PDF, DOCX, CSV, Anki Package).
-   Możliwość współdzielenia zestawów fiszek między użytkownikami.
-   Integracje z innymi platformami edukacyjnymi (np. LMS, Quizlet).
-   Aplikacje mobilne (iOS, Android). Dostępna jest tylko wersja webowa.
-   Obsługa formatowania tekstu (pogrubienie, kursywa, listy) na fiszkach.
-   Możliwość dodawania obrazów, dźwięków lub innych mediów do fiszek.
-   Funkcje organizacji fiszek, takie jak talie, foldery czy tagowanie.
-   Zaawansowane opcje konfiguracji generowania AI (np. wybór poziomu szczegółowości, typu fiszki).
-   Zaawansowane funkcje analityczne dotyczące postępów w nauce.
-   Logowanie za pomocą dostawców zewnętrznych (np. Google, Facebook).
-   Publiczna dostępność aplikacji.

## 5. Historyjki użytkowników

### 5.1. Zarządzanie Kontem

-   ID: US-001
-   Tytuł: Rejestracja nowego użytkownika
-   Opis: Jako nowy użytkownik, chcę móc zarejestrować się w aplikacji używając mojego adresu e-mail i hasła, abym mógł zacząć tworzyć i zapisywać moje fiszki.
-   Kryteria akceptacji:
    -   Muszę widzieć formularz rejestracji z polami na adres e-mail i hasło (oraz potwierdzenie hasła).
    -   Muszę podać prawidłowy adres e-mail.
    -   Muszę podać hasło spełniające minimalne wymagania bezpieczeństwa (np. długość).
    -   Hasło i jego potwierdzenie muszą być identyczne.
    -   Po pomyślnej rejestracji, jestem automatycznie zalogowany i przekierowany do głównego panelu aplikacji.
    -   Jeśli podany e-mail już istnieje w systemie, otrzymuję stosowny komunikat błędu.
    -   Jeśli wystąpi błąd walidacji (np. nieprawidłowy email, za krótkie hasło), widzę komunikat wskazujący problem.

-   ID: US-002
-   Tytuł: Logowanie użytkownika
-   Opis: Jako zarejestrowany użytkownik, chcę móc zalogować się do aplikacji używając mojego adresu e-mail i hasła, abym mógł uzyskać dostęp do moich zapisanych fiszek i kontynuować naukę.
-   Kryteria akceptacji:
    -   Muszę widzieć formularz logowania z polami na adres e-mail i hasło.
    -   Po wprowadzeniu prawidłowych danych uwierzytelniających i kliknięciu "Zaloguj", jestem przekierowany do głównego panelu aplikacji.
    -   Jeśli wprowadzę nieprawidłowy e-mail lub hasło, widzę stosowny komunikat błędu i pozostaję na stronie logowania.
    -   Po pomyślnym zalogowaniu, mam dostęp do funkcjonalności aplikacji (tworzenie, przeglądanie fiszek, powtórki).

-   ID: US-003
-   Tytuł: Wylogowanie użytkownika
-   Opis: Jako zalogowany użytkownik, chcę móc się wylogować z aplikacji, aby zakończyć moją sesję.
-   Kryteria akceptacji:
    -   Muszę widzieć opcję "Wyloguj" (np. przycisk, link) w interfejsie aplikacji.
    -   Po kliknięciu opcji "Wyloguj", moja sesja zostaje zakończona.
    -   Jestem przekierowany do strony logowania lub strony głównej dla niezalogowanych użytkowników.
    -   Nie mam już dostępu do moich fiszek ani funkcji wymagających zalogowania, dopóki ponownie się nie zaloguję.

### 5.2. Generowanie i Recenzja Fiszek AI

-   ID: US-004
-   Tytuł: Inicjowanie generowania fiszek przez AI
-   Opis: Jako zalogowany użytkownik, chcę móc wkleić tekst i wybrać liczbę fiszek (1, 2 lub 3), które AI ma dla mnie wygenerować, abym mógł szybko stworzyć podstawę do moich materiałów naukowych.
-   Kryteria akceptacji:
    -   Muszę widzieć pole tekstowe (textarea) do wklejenia tekstu źródłowego.
    -   Muszę widzieć opcję wyboru liczby fiszek do wygenerowania (np. dropdown, radio buttons z opcjami 1, 2, 3).
    -   Muszę widzieć przycisk do zainicjowania procesu generowania (np. "Generuj fiszki").
    -   Po kliknięciu przycisku, system wysyła zapytanie do API AI z wklejonym tekstem i wybraną liczbą.
    -   Podczas przetwarzania przez AI, widzę wskaźnik ładowania lub informację o trwającym procesie.
    -   Po otrzymaniu odpowiedzi od AI, system przechodzi do etapu recenzji kandydatów na fiszki.

-   ID: US-005
-   Tytuł: Recenzja i akceptacja kandydata na fiszkę AI
-   Opis: Jako użytkownik, po wygenerowaniu fiszek przez AI, chcę móc przejrzeć każdego kandydata i zaakceptować go, jeśli jest poprawny, aby zapisać go na moim koncie.
-   Kryteria akceptacji:
    -   Muszę widzieć interfejs prezentujący jednego kandydata na fiszkę na raz, pokazujący jego "przód" i "tył".
    -   Muszę widzieć przycisk "Akceptuj" dla bieżącego kandydata.
    -   Po kliknięciu "Akceptuj", kandydat jest oznaczany do zapisu, a ja widzę kolejnego kandydata (jeśli są) lub podsumowanie recenzji.
    -   Zaakceptowana fiszka zostanie zapisana w mojej bazie danych z oznaczeniem pochodzenia "AI" po zakończeniu recenzji wszystkich kandydatów.

-   ID: US-006
-   Tytuł: Recenzja i odrzucenie kandydata na fiszkę AI
-   Opis: Jako użytkownik, podczas przeglądania kandydatów na fiszki AI, chcę móc odrzucić kandydata, który jest niepoprawny lub nieprzydatny, aby nie został on zapisany na moim koncie.
-   Kryteria akceptacji:
    -   Muszę widzieć interfejs prezentujący jednego kandydata na fiszkę na raz.
    -   Muszę widzieć przycisk "Odrzuć" dla bieżącego kandydata.
    -   Po kliknięciu "Odrzuć", kandydat jest ignorowany i nie zostanie zapisany.
    -   Widzę kolejnego kandydata (jeśli są) lub podsumowanie recenzji.
    -   Akcja odrzucenia jest rejestrowana dla celów metryk.

-   ID: US-007
-   Tytuł: Recenzja, edycja i akceptacja kandydata na fiszkę AI
-   Opis: Jako użytkownik, podczas przeglądania kandydatów na fiszki AI, chcę móc edytować treść "przodu" lub "tyłu" kandydata przed jego zaakceptowaniem, aby poprawić jego jakość lub dostosować go do moich potrzeb.
-   Kryteria akceptacji:
    -   Muszę widzieć interfejs prezentujący jednego kandydata na fiszkę na raz.
    -   Muszę widzieć opcję "Edytuj" (lub pola edytowalne bezpośrednio).
    -   Po wybraniu edycji, mogę modyfikować tekst w polach "przód" i "tył".
    -   Edycja musi być ograniczona limitami znaków (przód <= 200, tył <= 500). Walidacja limitów odbywa się przy próbie zapisu/akceptacji.
    -   Muszę widzieć przycisk "Zapisz i Akceptuj" (lub podobny) po zakończeniu edycji.
    -   Po kliknięciu "Zapisz i Akceptuj", zmodyfikowany kandydat jest oznaczany do zapisu, a ja widzę kolejnego kandydata lub podsumowanie.
    -   Zmodyfikowana fiszka zostanie zapisana w mojej bazie danych z oznaczeniem pochodzenia "AI".

-   ID: US-008
-   Tytuł: Zakończenie procesu recenzji AI
-   Opis: Jako użytkownik, po przejrzeniu wszystkich kandydatów na fiszki AI, chcę zobaczyć potwierdzenie, które fiszki zostały zapisane, aby wiedzieć, że proces dobiegł końca.
-   Kryteria akceptacji:
    -   Po przetworzeniu ostatniego kandydata (zaakceptowaniu, odrzuceniu lub edycji i zaakceptowaniu), system zapisuje wszystkie zaakceptowane fiszki w bazie danych.
    -   Widzę komunikat potwierdzający zakończenie recenzji i informujący, ile fiszek zostało zapisanych.
    -   Mogę być przekierowany do widoku listy moich fiszek lub pozostać w sekcji generowania AI.

### 5.3. Manualne Zarządzanie Fiszkami

-   ID: US-009
-   Tytuł: Manualne tworzenie nowej fiszki
-   Opis: Jako zalogowany użytkownik, chcę móc ręcznie stworzyć nową fiszkę, wpisując jej treść w polach "przód" i "tył", abym mógł dodać własne materiały do nauki.
-   Kryteria akceptacji:
    -   Muszę widzieć dedykowany formularz lub sekcję do manualnego tworzenia fiszek.
    -   Formularz musi zawierać pole tekstowe dla "przodu" (limit 200 znaków) i "tyłu" (limit 500 znaków).
    -   Muszę widzieć przycisk "Zapisz fiszkę".
    -   Po wypełnieniu pól i kliknięciu "Zapisz", nowa fiszka jest dodawana do mojego konta z oznaczeniem pochodzenia "Manual".
    -   Jeśli przekroczę limit znaków, widzę komunikat błędu i fiszka nie zostaje zapisana.
    -   Po pomyślnym zapisie widzę potwierdzenie lub nowa fiszka pojawia się na liście moich fiszek.

-   ID: US-010
-   Tytuł: Przeglądanie wszystkich fiszek
-   Opis: Jako zalogowany użytkownik, chcę móc zobaczyć listę wszystkich moich zapisanych fiszek (zarówno stworzonych manualnie, jak i przez AI), abym mógł zarządzać moimi materiałami do nauki.
-   Kryteria akceptacji:
    -   Muszę widzieć dedykowaną sekcję lub stronę z listą moich fiszek.
    -   Każdy element listy musi pokazywać treść "przodu" i "tyłu" fiszki.
    -   Lista powinna być paginowana lub przewijalna, jeśli zawiera wiele fiszek.
    -   Przy każdej fiszce powinny być dostępne opcje edycji i usunięcia.

-   ID: US-011
-   Tytuł: Edycja istniejącej fiszki
-   Opis: Jako zalogowany użytkownik, chcę móc edytować treść "przodu" lub "tyłu" istniejącej fiszki, abym mógł poprawić błędy lub zaktualizować informacje.
-   Kryteria akceptacji:
    -   Na liście fiszek muszę widzieć opcję "Edytuj" przy każdej fiszce.
    -   Po kliknięciu "Edytuj", widzę formularz z aktualną treścią "przodu" i "tyłu" tej fiszki, gotowy do modyfikacji.
    -   Mogę edytować tekst w obu polach, przestrzegając limitów znaków (200/500).
    -   Muszę widzieć przycisk "Zapisz zmiany".
    -   Po zapisaniu zmian, widzę zaktualizowaną fiszkę na liście lub otrzymuję potwierdzenie.
    -   Jeśli przekroczę limit znaków podczas edycji, widzę błąd i zmiany nie są zapisywane.

-   ID: US-012
-   Tytuł: Usuwanie istniejącej fiszki
-   Opis: Jako zalogowany użytkownik, chcę móc usunąć fiszkę, której już nie potrzebuję, aby utrzymać porządek w moich materiałach do nauki.
-   Kryteria akceptacji:
    -   Na liście fiszek muszę widzieć opcję "Usuń" przy każdej fiszce.
    -   Po kliknięciu "Usuń", widzę prośbę o potwierdzenie tej akcji (np. "Czy na pewno chcesz usunąć tę fiszkę?").
    -   Jeśli potwierdzę usunięcie, fiszka zostaje trwale usunięta z mojego konta.
    -   Usunięta fiszka znika z listy moich fiszek.
    -   Jeśli anuluję akcję, fiszka pozostaje nienaruszona.

### 5.4. Sesja Powtórkowa (Spaced Repetition)

-   ID: US-013
-   Tytuł: Rozpoczęcie sesji powtórkowej
-   Opis: Jako zalogowany użytkownik, chcę móc rozpocząć sesję nauki (powtórkową), aby system pokazał mi fiszki, które wymagają powtórzenia zgodnie z algorytmem spaced repetition.
-   Kryteria akceptacji:
    -   Muszę widzieć przycisk lub opcję "Rozpocznij naukę" lub "Powtórz fiszki".
    -   Po kliknięciu tej opcji, system (korzystając z biblioteki SRS) identyfikuje fiszki gotowe do powtórki dla mnie.
    -   Jeśli są fiszki do powtórki, rozpoczyna się sesja i widzę przód pierwszej fiszki.
    -   Jeśli nie ma fiszek do powtórki, widzę stosowny komunikat (np. "Gratulacje, na dziś wszystko powtórzone!").

-   ID: US-014
-   Tytuł: Powtarzanie fiszki podczas sesji
-   Opis: Jako użytkownik w trakcie sesji powtórkowej, chcę zobaczyć przód fiszki, spróbować przypomnieć sobie odpowiedź, a następnie zobaczyć tył fiszki, aby sprawdzić swoją wiedzę.
-   Kryteria akceptacji:
    -   Podczas sesji powtórkowej widzę przód bieżącej fiszki.
    -   Muszę widzieć przycisk "Pokaż odpowiedź" lub podobny.
    -   Po kliknięciu tego przycisku, widzę również tył tej samej fiszki.
    -   Po zobaczeniu odpowiedzi, widzę opcje oceny mojej znajomości fiszki (zależne od biblioteki SRS, np. "Wiem"/"Nie wiem", "Łatwe"/"Trudne"/"Powtórz").

-   ID: US-015
-   Tytuł: Ocena powtórzonej fiszki
-   Opis: Jako użytkownik, po zobaczeniu odpowiedzi na fiszce podczas sesji powtórkowej, chcę móc ocenić, jak dobrze ją znam, aby algorytm spaced repetition mógł zaplanować kolejną powtórkę.
-   Kryteria akceptacji:
    -   Po odsłonięciu tyłu fiszki, widzę dostępne opcje oceny (np. przyciski "Wiem", "Nie wiem").
    -   Muszę wybrać jedną z opcji oceny.
    -   Po wybraniu oceny, system przekazuje tę informację do biblioteki SRS, która aktualizuje interwał powtórki dla tej fiszki.
    -   System prezentuje kolejną fiszkę do powtórki (jeśli są) lub kończy sesję, jeśli to była ostatnia.

-   ID: US-016
-   Tytuł: Zakończenie sesji powtórkowej
-   Opis: Jako użytkownik, chcę wiedzieć, kiedy zakończyłem powtarzanie wszystkich zaplanowanych na daną sesję fiszek.
-   Kryteria akceptacji:
    -   Po ocenieniu ostatniej fiszki w danej sesji, widzę komunikat o zakończeniu sesji (np. "Ukończono sesję powtórkową!").
    -   Mogę być przekierowany do panelu głównego lub otrzymać podsumowanie sesji (w MVP wystarczy komunikat o zakończeniu).

### 5.5. Obsługa Błędów

-   ID: US-017
-   Tytuł: Obsługa błędu API AI
-   Opis: Jako użytkownik, jeśli wystąpi problem podczas komunikacji z API AI (np. błąd sieci, błąd serwera AI, brak wyników), chcę otrzymać zrozumiały komunikat o błędzie, zamiast niejasnej awarii aplikacji.
-   Kryteria akceptacji:
    -   Gdy inicjuję generowanie fiszek przez AI i wystąpi błąd komunikacji z API OpenRouter.
    -   Lub gdy API zwróci błąd lub pustą odpowiedź.
    -   Widzę komunikat informujący o problemie (np. "Nie udało się wygenerować fiszek. Spróbuj ponownie później lub zmień tekst źródłowy.").
    -   Aplikacja pozostaje stabilna i mogę spróbować ponownie lub wykonać inne akcje.

-   ID: US-018
-   Tytuł: Obsługa błędu zapisu fiszki
-   Opis: Jako użytkownik, jeśli wystąpi problem podczas zapisywania fiszki (manualnie lub po recenzji AI) do bazy danych, chcę otrzymać komunikat o błędzie.
-   Kryteria akceptacji:
    -   Gdy próbuję zapisać nową fiszkę manualnie lub zaakceptować kandydata AI.
    -   I wystąpi błąd po stronie serwera lub bazy danych uniemożliwiający zapis.
    -   Widzę komunikat informujący o niepowodzeniu zapisu (np. "Nie udało się zapisać fiszki. Spróbuj ponownie.").
    -   Fiszka nie zostaje zapisana (lub zostaje zachowana w stanie do recenzji, jeśli to recenzja AI).

-   ID: US-019
-   Tytuł: Obsługa przekroczenia limitów znaków
-   Opis: Jako użytkownik, podczas tworzenia lub edycji fiszki (manualnie lub podczas recenzji AI), jeśli przekroczę dozwoloną liczbę znaków w polu "przód" lub "tył", chcę zostać o tym poinformowany przed próbą zapisu.
-   Kryteria akceptacji:
    -   Gdy wpisuję tekst w pole "przód" i przekroczę 200 znaków.
    -   Lub gdy wpisuję tekst w pole "tył" i przekroczę 500 znaków.
    -   Widzę wizualny wskaźnik lub komunikat informujący o przekroczeniu limitu.
    -   Przycisk zapisu może być nieaktywny lub próba zapisu skutkuje błędem walidacji z komunikatem dla użytkownika.
    -   Fiszka nie zostaje zapisana, dopóki limity nie zostaną spełnione.

## 6. Metryki sukcesu

### 6.1. Główne Kryteria Sukcesu MVP

1.  Akceptacja fiszek generowanych przez AI:
    -   Metryka: Procent kandydatów na fiszki wygenerowanych przez AI, które zostały zaakceptowane (bezpośrednio lub po edycji) przez użytkowników podczas etapu recenzji.
    -   Cel: 75%
    -   Pomiar: Śledzenie liczby akcji "Akceptuj" i "Edytuj i Akceptuj" w stosunku do całkowitej liczby wygenerowanych kandydatów na fiszki przez AI. Pomiar globalny, agregowany dla wszystkich użytkowników.

2.  Wykorzystanie funkcji generowania AI:
    -   Metryka: Procent zapisanych fiszek w systemie, które zostały utworzone za pomocą funkcji generowania AI (mają pochodzenie "AI").
    -   Cel: 75%
    -   Pomiar: Śledzenie atrybutu `origin` ("AI" lub "Manual") dla każdej zapisanej fiszki. Obliczanie globalnego stosunku liczby fiszek z `origin="AI"` do całkowitej liczby zapisanych fiszek w systemie.

### 6.2. Metryki Drugorzędne

1.  Całkowita liczba zarejestrowanych użytkowników.
    -   Pomiar: Zliczanie unikalnych kont użytkowników w bazie danych.
2.  Całkowita liczba zapisanych fiszek w systemie.
    -   Pomiar: Zliczanie wszystkich rekordów fiszek w bazie danych.
3.  Średnia liczba zapisanych fiszek na użytkownika.
    -   Pomiar: Całkowita liczba zapisanych fiszek podzielona przez całkowitą liczbę zarejestrowanych użytkowników.

### 6.3. Kwestie nierozwiązane/Do ustalenia

-   Konkretna biblioteka open-source dla algorytmu powtórek: Należy wybrać i udokumentować bibliotekę przed implementacją (wpłynie na US-013, US-014, US-015).
-   Szczegółowy projekt interfejsu użytkownika dla recenzji AI oraz sesji powtórkowej.
-   Strategia obsługi potencjalnych kosztów API AI (OpenRouter) po fazie MVP, jeśli aplikacja miałaby być rozwijana i udostępniona publicznie.
```
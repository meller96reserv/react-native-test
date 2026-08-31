# Focus Flow

Небольшое Expo-приложение, демонстрирующее воронку onboarding → paywall → home. Покупка
эмулируется локально: после неё подписка сохраняется, и следующий запуск сразу открывает home.

## Запуск

Требования: Node.js 22.13+ или 24+, npm, Expo Go либо Android/iOS simulator.

```bash
npm install
npm start
```

После запуска нажмите `a` для Android или `i` для iOS. На Windows iOS Simulator недоступен;
приложение можно открыть на физическом iPhone через Expo Go.

Проверки:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test -- --runInBand
```

## Архитектура

- Expo Router отвечает за тонкий слой маршрутов и redirects.
- React Context + `useReducer` хранит небольшое глобальное session-состояние.
- State и actions находятся в разных контекстах, чтобы снизить лишние ререндеры.
- AsyncStorage adapter сохраняет versioned subscription record и валидирует данные при чтении.
- Feature-модули содержат экраны onboarding, paywall и home; UI-kit и theme используются совместно.
- Пока storage гидратируется, показывается отдельный launch view без мигания onboarding.

Подробное обоснование находится в [docs/architecture.md](docs/architecture.md), актуальный прогресс —
в [docs/todo.md](docs/todo.md).

## Структура

```text
app/             маршруты Expo Router
src/components/  общие UI-компоненты
src/features/    экраны и feature-компоненты
src/session/     state machine, provider и hooks
src/storage/     persistence adapter и runtime parser
src/theme/       дизайн-токены
docs/            архитектура, план и сценарий демонстрации
```

## Что улучшить для production

- заменить эмуляцию на RevenueCat/StoreKit/Google Play Billing и добавить restore purchases;
- валидировать entitlement на сервере и синхронизировать его между устройствами;
- добавить локализацию, privacy/terms, аналитику воронки и crash reporting;
- добавить Maestro/Detox E2E, CI и визуальные regression-тесты;
- провести тесты на реальном наборе Android/iOS устройств и accessibility-аудит.

## Ограничения демо

Цены фиктивны, деньги не списываются. Сбросить сценарий первого запуска можно очисткой данных
приложения или удалением ключа `@focus-flow/subscription` из AsyncStorage.

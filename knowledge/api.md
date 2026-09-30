# Lunarion API Reference

This file summarizes the documented Lunarion API used by Lunae.

## Core

### MakeKeySystem

Creates Lunarion's key-verification interface.

Common configuration fields include:

- `Title`
- `Subtitle`
- `About`
- `Note`
- `Key`
- `GrabKeyFromSite`
- `SaveKey`
- `FileName`
- `Icon`
- `ImageSource`
- `GetKeyLink`
- `GetKeyText`
- `Warning`
- `TutorialLink`
- `Theme`
- `Closable`

The key system returns whether verification succeeds or the interface is closed.

### MakeWindow

Creates the main Lunarion window.

### MakeTab

Creates a regular content tab.

### MakeTabSection

Creates a sidebar section/divider for organizing tabs.

## Window

### SetTabStyle

Supported styles documented by Lunarion include:

- `Top`
- `Side`
- `Toggle`

## Elements

Lunarion content elements include:

- `AddSection`
- `AddToggle`
- `AddSlider`
- `AddDropdown`
- `AddInput`
- `AddBind`
- `AddColorpicker`
- `AddParagraph`
- `AddButton`

## Themes

Documented Lunarion themes include:

- `Lunarion`
- `Default`
- `Amethyst`
- `Ocean`
- `Rose`
- `Emerald`
- `Light`
- `Sakura`

## Icons

Lunarion supports icon sources including:

- Lucide
- Material
- Feather
- Custom icons

## Homeboard

The window can enable its Homeboard through the documented `Homeboard` configuration.

The source also exposes a `Dashboard` alias for the Homeboard implementation.

## Important

Lunae should treat `knowledge/Lunarion.lua` as the authoritative source.

If an API feature is not documented by the source, Lunae should say that it is not confirmed rather than inventing an API.
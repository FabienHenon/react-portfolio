import i18n from "i18next";

i18n.init({
  resources: {
    en: {
      default: {
        entityError: "An error has occurred when requesting the entity",
        entityLoading: "Loading",
        entityNotAsked: "The entity has not been asked yet",
        entityUpdated: "Entity has been updated",
        firstnameLabel: "Firstname",
        lastnameLabel: "Lastname"
      },
      httpError: {
        badUrl: "Invalid url. Please retry in a few minutes",
        timeout: "Request timeout. Please retry in a few minutes",
        networkError: "Internet connectivity error. Please retry in a few minutes",
        badStatus: {
          _400: "Invalid request. Please retry in a few minutes",
          _401: "You must be logged in",
          _403: "You are not authorized to do this action",
          _404: "Request not found. Please retry in a few minutes",
          _422: "Invalid data. Please retry in a few minutes",
          _461: "Correct request, but resource not found",
          _500: "Server is unavailable. Please retry in a few minutes",
          any: "An error occured, please contact an administrator with the following code {{code}}"
        },
        badPayload: "The request's answer is not valid. Please retry in a few minutes",
        httpErrorTitle: "Error",
        invalidData: "Sent data is invalid"
      },
      validation: {
        noCurrentDate: "The current date is not known",
        notBetween: "Must be between {{min}} and {{max}}",
        invalidEmail: "{{email}} is not a valid email address",
        invalidUrl: "{{url}} is not a valid link",
        mustAcceptTerms: "Terms & Conditions must be read and accepted",
        mustBeGreaterOrEqualTo: "Must be greater or equal to {{ref}}",
        mustBeLowerOrEqualTo: "Must be lower or equal to {{ref}}",
        notBlank: "This field is required",
        notBeforeDate: "The date cannot be before {{date}}",
        notCorrectMinLength: "The minimum number of characters is {{minLength}}",
        notInlist: "Valid values are {{items}}",
        notToday: "This is not the correct day to perform this action",
        passwordsMustBeIdentical: "Passwords must be identical",
        notBeforeStartTime: "This date must be after the start date"
      },
      common: {
        close: "Close",
        delete: "Delete",
        edit: "Edit",
        submit: "Submit"
      }
    },
    fr: {
      default: {
        entityError: "Une erreur est survenue lors de la récupération de l'entité",
        entityLoading: "Chargement",
        entityNotAsked: "L'entité n'a pas encore été demandée",
        entityUpdated: "L'entité a bien été éditée",
        firstnameLabel: "Prénom",
        lastnameLabel: "Nom"
      },
      httpError: {
        badUrl: "Url invalide. Merci d'essayer de nouveau dans quelques minutes",
        timeout: "Temps de chargement trop long. Merci d'essayer de nouveau dans quelques minutes",
        networkError: "Erreur de connexion internet. Merci d'essayer de nouveau dans quelques minutes",
        badStatus: {
          _400: "Requête invalide. Merci d'essayer de nouveau dans quelques minutes",
          _401: "Tu dois te connecter à ton compte",
          _403: "Tu n'es pas autorisé(e) à réaliser cette action",
          _404: "Requête non trouvée. Merci d'essayer de nouveau dans quelques minutes",
          _422: "Données invalides. Merci d'essayer de nouveau dans quelques minutes",
          _461: "La requête est valide mais la ressource n'a pas été trouvée",
          _500: "Le serveur est actuellement indisponible. Merci d'essayer de nouveau dans quelques minutes",
          any: "Une erreur est apparue, merci de contacter un administrateur avec le code suivant {{code}}"
        },
        badPayload: "Le résultat de la requête n'est pas valide. Merci d'essayer de nouveau dans quelques minutes",
        httpErrorTitle: "Erreur",
        invalidData: "Les données envoyées sont invalides"
      },
      validation: {
        noCurrentDate: "La date actuelle n'est pas connue",
        notBetween: "Doit être entre {{min}} et {{max}}",
        invalidEmail: "{{email}} n'est pas une adresse email valide",
        invalidUrl: "{{url}} n'est pas un lien valide",
        mustAcceptTerms: "Les conditions générales d'utilisation doivent être lues et acceptées",
        mustBeGreaterOrEqualTo: "Doit être supérieur ou égal à {{ref}}",
        mustBeLowerOrEqualTo: "Doit être inférieur ou égal à {{ref}}",
        notBlank: "Ce champ est requis",
        notBeforeDate: "La date ne peut être antérieure à {{date}}",
        notCorrectMinLength: "Le nombre minmimum de caractères est de {{minLength}}",
        notInlist: "Les valeurs valides sont {{items}}",
        notToday: "Ce n'est pas le bon jour pour faire cette action",
        passwordsMustBeIdentical: "Les mots de passe doivent être identiques",
        notBeforeStartTime: "Cette date doit être plus tard que la date de début"
      },
      common: {
        close: "Fermer",
        delete: "Supprimer",
        edit: "Editer",
        submit: "Envoyer"
      }
    }
  },
  fallbackLng: "fr",
  debug: true,
  ns: ["default", "httpError", "validation", "common"],
  defaultNS: "default"
});

export default i18n;

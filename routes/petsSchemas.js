const S = require('fluent-json-schema').default;


const PetValidationSchema = S.object()
.prop(
  "type", S.string().minLength(1).required())
.prop(
  "name", S.string().minLength(1).required())
.prop(
  "status", S.string().minLength(1).required())
.prop(
  "picture", S.required())
.prop(
  "height", S.string().minLength(1).required())
.prop(
  "weight", S.string().minLength(1).required())
  .prop(
    "color", S.string().minLength(1).required())
  .prop(
    "bio", S.string().minLength(1).required())
  .prop(
    "hypo", S.string().minLength(1).required())
  .prop(
    "diet", S.string().minLength(1).required())
  .prop(
    "breed", S.string().minLength(1).required())
  .prop(
    "email", S.string().required())
.valueOf();

exports.PetValidationSchema = PetValidationSchema;

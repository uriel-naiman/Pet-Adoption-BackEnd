const S = require('fluent-json-schema').default;

const NewUserValidationSchema = S.object()
  .prop(
    "email", S.string().minLength(4).required())
  .prop(
    "password", S.string().minLength(4).required())
  .prop(
    "password2", S.string().minLength(4).required())
  .prop(
    "firstName", S.string().minLength(2).required())
  .prop(
    "lastName", S.string().minLength(2).required())
  .prop(
    "phoneNumber", S.string().minLength(1).required())
  .valueOf();

exports.NewUserValidationSchema = NewUserValidationSchema;

const updateUserValidationSchema = S.object()
.prop(
  "email", S.string().required())
.prop(
  "password", S.string().required())
.prop(
  "password2", S.string().required())
.prop(
  "firstName", S.string().required())
.prop(
  "lastName", S.string().required())
.prop(
  "phoneNumber", S.string().required())
.prop(
  "text", S.string().required())
.valueOf();
exports.updateUserValidationSchema = updateUserValidationSchema;

const LogInValidationSchema = S.object()
  .prop(
    "email", S.string().minLength(8).required())
  .prop(
    "password", S.string().minLength(3).required())
  .valueOf();

exports.LogInValidationSchema = LogInValidationSchema;

const userIdValidationSchema = S.object()
  .prop(
    "id", S.string().minLength(20).required())
  .valueOf();

exports.userIdValidationSchema = userIdValidationSchema;

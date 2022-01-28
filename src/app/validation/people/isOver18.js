function isOver18(dateOfBirth) {
  // find the date 18 years ago
  const date18YrsAgo = new Date();
  date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
  // check if the date of birth is before that date
  return dateOfBirth <= date18YrsAgo;
}
module.exports = isOver18;
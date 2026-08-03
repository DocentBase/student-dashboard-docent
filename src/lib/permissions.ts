export function canEditProfile(field: string): boolean {
  const editableFields = ['profile_photo_url', 'phone', 'email'];
  return editableFields.includes(field);
}

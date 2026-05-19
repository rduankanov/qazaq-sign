import { Linking, Alert } from 'react-native';

export async function openWhatsApp(phone: string, message: string = '') {
  const cleaned = phone.replace(/\D/g, '');
  const url = `whatsapp://send?phone=${cleaned}&text=${encodeURIComponent(message)}`;
  const webUrl = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;

  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    await Linking.openURL(webUrl);
  }
}

export function buildContactMessage(postTitle: string): string {
  return `Сәлем! "${postTitle}" хабарландыруыңызды көрдім. Толығырақ айта аласыз ба?`;
}

export function callPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  Linking.openURL(`tel:+${cleaned}`).catch(() => {
    Alert.alert('Қате', 'Қоңырау шалу мүмкін болмады.');
  });
}

export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, '');
  if (d.length === 11) {
    return `+${d[0]} (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7, 9)}-${d.slice(9)}`;
  }
  return phone;
}

import { supabase } from './supabase';

export type IntakeItem = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed: boolean;
  fileUrl?: string;
};

export class PortalEngine {
  /**
   * Fetches the default or custom checklist for the portal.
   */
  static async getChecklist(userId: string): Promise<IntakeItem[]> {
    const { data } = await supabase
      .from('usage_logs')
      .select('metadata')
      .eq('user_id', userId)
      .eq('action', 'checklist_item');

    if (!data || data.length === 0) {
      // Default template for new professionals
      return [
        { id: '1', title: 'Upload Government ID', description: 'Please provide a scanned copy of a valid ID.', required: true, completed: false },
        { id: '2', title: 'Sign Retainer Agreement', description: 'Review and sign our standard terms.', required: true, completed: false },
        { id: '3', title: 'Project Brief', description: 'Fill out the initial project requirements questionnaire.', required: false, completed: false },
      ];
    }
    return data.map(d => d.metadata as IntakeItem);
  }

  /**
   * Mark an item as complete
   */
  static async completeItem(userId: string, itemId: string, fileUrl?: string) {
    const { error } = await supabase.from('usage_logs').insert({
      user_id: userId,
      action: 'item_completed',
      metadata: { itemId, fileUrl }
    });
    if (error) throw new Error(error.message);
    return true;
  }
}

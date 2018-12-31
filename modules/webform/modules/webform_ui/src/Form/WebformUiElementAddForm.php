<?php

namespace Drupal\webform_ui\Form;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\WebformInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Provides an add webform for a webform element.
 */
class WebformUiElementAddForm extends WebformUiElementFormBase {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, WebformInterface $webform = NULL, $key = NULL, $parent_key = NULL, $type = NULL) {
    $this->webform = $webform;
    $this->element['#type'] = $type;
    $this->action = $this->t('created');

    $parent_key = $this->getRequest()->get('parent');
    if ($parent_key) {
      $parent_element = $webform->getElementDecoded($parent_key);
      if (!$parent_element) {
        throw new NotFoundHttpException();
      }
    }

    $element_plugin = $this->getWebformElementPlugin();

    $form['#title'] = $this->t('Add @label element', ['@label' => $element_plugin->getPluginLabel()]);

    $form = parent::buildForm($form, $form_state, $webform, NULL, $parent_key);
    if (isset($form['properties']['element']['title'])) {
      $form['properties']['element']['title']['#attributes']['autofocus'] = 'autofocus';
    }
    return $form;
  }

}

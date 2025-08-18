<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Omaralalwi\Gpdf\Gpdf;
use Omaralalwi\Gpdf\GpdfConfig;

class ReportExportController extends Controller
{
    // ... existing code ...
    public function export(Report $report, $type)
    {
        $form = $report->form;
        $view = 'reports.exports.' . $form->template;
        if (!view()->exists($view)) {
            $view = 'reports.export';
        }

        if ($type === 'pdf') {
            $pdf = Gpdf::loadView($view, [
                'form' => $form,
                'answers' => $report->data,
                'report' => $report,
            ]);
            $filename = 'report_' . $report->id . '.pdf';
            return $pdf->download($filename);
        }

        // fallback: render HTML view (for PNG or preview)
        return view($view, [
            'form' => $form,
            'answers' => $report->data,
            'report' => $report,
        ]);
    }
    // ... existing code ...
}
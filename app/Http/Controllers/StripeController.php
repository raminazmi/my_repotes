<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session as StripeSession;

class StripeController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $user = auth()->user();
        $type = $request->input('subscription_type', 'monthly');
        $amount = $type === 'yearly' ? 500 : 50; // مثال: 50 ريال شهري، 500 ريال سنوي

        $session = StripeSession::create([
            'payment_method_types' => ['card'],
            'customer_email' => $user->email,
            'line_items' => [[
                'price_data' => [
                    'currency' => 'sar',
                    'product_data' => [
                        'name' => $type === 'yearly' ? 'اشتراك سنوي' : 'اشتراك شهري',
                    ],
                    'unit_amount' => $amount * 100, // Stripe uses cents
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => url('/payments/success?session_id={CHECKOUT_SESSION_ID}'),
            'cancel_url' => url('/payments/cancel'),
            'metadata' => [
                'user_id' => $user->id,
                'subscription_type' => $type,
            ],
        ]);

        return response()->json(['id' => $session->id, 'url' => $session->url]);
    }

    public function webhook(Request $request)
    {
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        try {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\Exception $e) {
            return response('Webhook Error: ' . $e->getMessage(), 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $userId = $session->metadata->user_id ?? null;
            $subscriptionType = $session->metadata->subscription_type ?? 'monthly';
            $amount = $session->amount_total / 100;
            $currency = $session->currency;
            $stripePaymentId = $session->payment_intent ?? null;

            // حساب تاريخ البداية والنهاية
            $startDate = now();
            $endDate = $subscriptionType === 'yearly'
                ? now()->addYear()
                : now()->addMonth();

            // حفظ الدفع
            \App\Models\Payment::create([
                'user_id' => $userId,
                'amount' => $amount,
                'currency' => $currency,
                'status' => 'paid',
                'payment_method' => 'stripe',
                'stripe_payment_id' => $stripePaymentId,
                'subscription_type' => $subscriptionType,
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            // تحديث بيانات المستخدم
            $user = \App\Models\User::find($userId);
            if ($user) {
                $user->subscription_type = $subscriptionType;
                $user->subscription_end = $endDate;
                $user->save();
            }
        }

        return response('Webhook handled', 200);
    }
}
